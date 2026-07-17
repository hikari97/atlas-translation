"""Prompts and normalization for editable image-translation text metadata."""

from __future__ import annotations

import json
import re
from collections.abc import Mapping, Sequence

from app.image_localization.contracts import ImageLocalizationRequest, LocalizedText
from app.image_localization.image_response import ImageSize


MAX_CONTEXT_LENGTH = 1_000
MIN_FONT_SIZE = 12
MAX_FONT_SIZE = 96
DEFAULT_FONT_FAMILY = "WildWords"
DEFAULT_FILL_COLOR = "#0e0c0f"
DEFAULT_STROKE_COLOR = "#f9f7f9"
DEFAULT_BACKGROUND_COLOR = "#ffffff"
MIN_TEXT_REGION_SIZE = 1.0
HEX_COLOR_PATTERN = re.compile(r"^#[0-9a-fA-F]{6}$")
JSON_CODE_FENCE_PATTERN = re.compile(r"^```(?:json)?\s*|\s*```$", re.IGNORECASE)
JSON_OBJECT_PATTERN = re.compile(r"\{.*\}", re.DOTALL)


def build_translation_prompt(
    request: ImageLocalizationRequest,
    requires_metadata: bool,
) -> str:
    """Builds the text-replacement instruction for an image editing model."""
    language_name = get_language_name(request.target_language)
    source_language = request.source_language or "the detected source language"
    metadata_instruction = (
        "After generating the image, respond with only this valid JSON object, without markdown: "
        '{"context":"short processing summary","text":[{"x":0.0,"y":0.0,'
        '"width":0.0,"height":0.0,"text":"translated string",'
        '"originalText":"source string","textAlign":"center",'
        '"fillColor":"#112233","strokeColor":"#ffffff","lineWidth":0,'
        '"addFontBorder":false,"addFontBackground":false,"rotation":0.0,'
        '"layout":"h","textDir":"ltr"}]}. '
        "Each coordinate must be normalized from 0 to 1 relative to the source image. "
        "Detect the actual text fill and outline colors; lineWidth must be 0 when no outline exists."
        if requires_metadata
        else "Do not return explanatory text; return the translated image."
    )

    return (
        "Edit the supplied comic or manga page. Preserve the composition, characters, "
        "line art, panels, speech balloons, colors, and aspect ratio. Translate every readable "
        f"caption, dialogue, sign, sound effect, and label from {source_language} into {language_name}. "
        "Replace only the text in its original visual region. Do not add commentary, watermarks, "
        "or unrelated artwork. Keep the translated lettering readable and faithful to the source. "
        f"{format_context(request.context)} {metadata_instruction}"
    )


def build_inpainting_prompt(request: ImageLocalizationRequest) -> str:
    """Builds the clean-image instruction for an image editing model."""
    return (
        "Edit the supplied comic or manga page into a clean text-free base image. Remove every "
        "visible character of dialogue, captions, labels, signs, lettering, and sound effects. "
        "Reconstruct only the obscured background, balloon interiors, texture, and line art. "
        "Preserve the exact panels, characters, colors, composition, and aspect ratio. Do not add "
        "new text, translated text, watermarks, or unrelated artwork. "
        f"{format_context(request.context)}"
    )


def parse_text_metadata(
    content: str,
    source_size: ImageSize,
    output_size: ImageSize,
    target_language: str,
) -> tuple[str, tuple[LocalizedText, ...]]:
    """Parses model JSON and maps normalized boxes to output-image pixels."""
    metadata = extract_json_object(content)
    if metadata is None:
        return "", tuple()

    context = metadata.get("context")
    response_context = context.strip() if isinstance(context, str) else ""
    raw_text_regions = metadata.get("text")
    if not isinstance(raw_text_regions, Sequence) or isinstance(raw_text_regions, (str, bytes)):
        return response_context, tuple()

    regions = tuple(
        normalized_region
        for raw_region in raw_text_regions
        if (normalized_region := normalize_text_region(
            raw_region,
            source_size,
            output_size,
            target_language,
        )) is not None
    )
    return response_context, regions


def format_context(context: str) -> str:
    """Adds optional user context as reference text with a bounded length."""
    normalized_context = context.strip()[:MAX_CONTEXT_LENGTH]
    return f"Reference context only: {normalized_context}." if normalized_context else ""


def extract_json_object(content: str) -> Mapping[str, object] | None:
    """Extracts a JSON object from plain or fenced model text."""
    trimmed_content = JSON_CODE_FENCE_PATTERN.sub("", content.strip()).strip()
    candidates = (trimmed_content,)
    embedded_match = JSON_OBJECT_PATTERN.search(trimmed_content)
    if embedded_match:
        candidates = (trimmed_content, embedded_match.group(0))

    for candidate in candidates:
        try:
            parsed: object = json.loads(candidate)
        except json.JSONDecodeError:
            continue

        if isinstance(parsed, Mapping):
            return parsed

    return None


def normalize_text_region(
    raw_region: object,
    source_size: ImageSize,
    output_size: ImageSize,
    target_language: str,
) -> LocalizedText | None:
    """Normalizes a model text region into the public editor contract values."""
    if not isinstance(raw_region, Mapping):
        return None

    translated_text = get_text(raw_region.get("text"))
    if not translated_text:
        return None

    x = scale_coordinate(raw_region.get("x"), source_size.width, output_size.width)
    y = scale_coordinate(raw_region.get("y"), source_size.height, output_size.height)
    width = scale_dimension(raw_region.get("width"), source_size.width, output_size.width)
    height = scale_dimension(raw_region.get("height"), source_size.height, output_size.height)
    x = clamp(x, 0.0, max(0.0, output_size.width - MIN_TEXT_REGION_SIZE))
    y = clamp(y, 0.0, max(0.0, output_size.height - MIN_TEXT_REGION_SIZE))
    width = clamp(width, MIN_TEXT_REGION_SIZE, max(MIN_TEXT_REGION_SIZE, output_size.width - x))
    height = clamp(height, MIN_TEXT_REGION_SIZE, max(MIN_TEXT_REGION_SIZE, output_size.height - y))

    line_width = max(0, round(to_number(raw_region.get("lineWidth"), 0.0)))
    font_size = round(clamp(height * 0.52, MIN_FONT_SIZE, MAX_FONT_SIZE))

    return LocalizedText(
        x=x,
        y=y,
        width=width,
        height=height,
        text=translated_text,
        original_text=get_text(raw_region.get("originalText")),
        text_align=get_text_align(raw_region.get("textAlign")),
        stroke_color=get_color(raw_region.get("strokeColor"), DEFAULT_STROKE_COLOR),
        line_width=line_width,
        fill_color=get_color(raw_region.get("fillColor"), DEFAULT_FILL_COLOR),
        font=f"{font_size}px {DEFAULT_FONT_FAMILY}",
        add_font_background=get_boolean(raw_region.get("addFontBackground"), False),
        add_font_border=get_boolean(raw_region.get("addFontBorder"), line_width > 0),
        add_background_color=get_color(
            raw_region.get("addBackgroundColor"),
            DEFAULT_BACKGROUND_COLOR,
        ),
        rotation=to_number(raw_region.get("rotation"), 0.0),
        angle=to_number(raw_region.get("angle"), 0.0),
        layout=get_layout(raw_region.get("layout")),
        text_dir=get_text_direction(raw_region.get("textDir"), target_language),
    )


def get_language_name(language_code: str) -> str:
    """Maps common target-language codes to human-readable prompt names."""
    language_names = {
        "id": "Indonesian",
        "en": "English",
        "es": "Spanish",
        "ja": "Japanese",
        "ko": "Korean",
        "zh": "Chinese",
    }
    return language_names.get(language_code.strip().lower(), language_code)


def to_number(value: object, fallback: float) -> float:
    """Converts numeric JSON values while excluding booleans."""
    if isinstance(value, bool):
        return fallback
    if isinstance(value, (int, float)):
        return float(value)
    return fallback


def scale_coordinate(value: object, source_extent: int, output_extent: int) -> float:
    """Scales normalized or source-pixel coordinates to the output image."""
    coordinate = to_number(value, 0.0)
    if 0.0 <= coordinate <= 1.0:
        return coordinate * output_extent
    return coordinate / max(source_extent, 1) * output_extent


def scale_dimension(value: object, source_extent: int, output_extent: int) -> float:
    """Scales normalized or source-pixel dimensions to the output image."""
    dimension = to_number(value, MIN_TEXT_REGION_SIZE)
    if 0.0 <= dimension <= 1.0:
        return max(MIN_TEXT_REGION_SIZE, dimension * output_extent)
    return max(MIN_TEXT_REGION_SIZE, dimension / max(source_extent, 1) * output_extent)


def clamp(value: float, lower_bound: float, upper_bound: float) -> float:
    """Constrains a numeric value to an inclusive range."""
    return max(lower_bound, min(value, upper_bound))


def get_text(value: object) -> str:
    """Returns a stripped text value or an empty string."""
    return value.strip() if isinstance(value, str) else ""


def get_text_align(value: object) -> str:
    """Returns a supported text alignment."""
    if isinstance(value, str) and value in {"left", "center", "right"}:
        return value
    return "center"


def get_color(value: object, fallback: str) -> str:
    """Returns a six-digit color value or the supplied default."""
    return value if isinstance(value, str) and HEX_COLOR_PATTERN.fullmatch(value) else fallback


def get_boolean(value: object, fallback: bool) -> bool:
    """Returns a boolean JSON value or the supplied default."""
    return value if isinstance(value, bool) else fallback


def get_layout(value: object) -> str:
    """Returns horizontal or vertical text layout."""
    if isinstance(value, str) and value in {"h", "v"}:
        return value
    return "h"


def get_text_direction(value: object, target_language: str) -> str:
    """Returns direction from metadata or the target-language fallback."""
    if isinstance(value, str) and value in {"ltr", "rtl"}:
        return value
    return "rtl" if target_language.strip().lower() in {"ar", "fa", "he", "ur"} else "ltr"
