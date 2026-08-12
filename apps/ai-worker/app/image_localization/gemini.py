"""Direct Gemini implementation for stateless comic image localization."""

from __future__ import annotations

import os
from concurrent.futures import ThreadPoolExecutor
from typing import Protocol

from google import genai
from google.genai import types

from app.image_localization.contracts import (
    ImageLocalizationRequest,
    ImageLocalizationResult,
)
from app.image_localization.image_response import (
    GeneratedImage,
    get_image_size,
    normalize_image_bytes,
)
from app.image_localization.provider import ImageLocalizationProvider
from app.image_localization.text_metadata import (
    build_inpainting_prompt,
    build_translation_prompt,
    parse_text_metadata,
)


DEFAULT_GEMINI_IMAGE_MODEL = "gemini-3.1-flash-lite-image"
DEFAULT_TIMEOUT_SECONDS = 240
MAX_PARALLEL_GENERATIONS = 2


class GeminiImageGenerator(Protocol):
    """Generates one image response through the direct Gemini API."""

    def generate(
        self,
        model: str,
        image_bytes: bytes,
        mime_type: str,
        prompt: str,
    ) -> GeneratedImage:
        """Returns one normalized generated image and optional response text."""


class GoogleGenAiImageGenerator:
    """Small SDK adapter that keeps Google response details out of the provider."""

    def __init__(self, api_key: str, timeout_seconds: int) -> None:
        self._api_key = api_key
        self._timeout_milliseconds = timeout_seconds * 1_000

    def generate(
        self,
        model: str,
        image_bytes: bytes,
        mime_type: str,
        prompt: str,
    ) -> GeneratedImage:
        """Edits one uploaded image with Gemini and normalizes its output."""
        client = genai.Client(
            api_key=self._api_key,
            http_options=types.HttpOptions(timeout=self._timeout_milliseconds),
        )

        try:
            response = client.models.generate_content(
                model=model,
                contents=[
                    types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                    prompt,
                ],
                config=types.GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                ),
            )
        finally:
            client.close()

        return generated_image_from_gemini_response(response)


class GeminiImageLocalizationProvider(ImageLocalizationProvider):
    """Uses the configured direct Gemini image model for both editor renders."""

    def __init__(
        self,
        api_key: str,
        model: str,
        timeout_seconds: int,
        generator: GeminiImageGenerator | None = None,
    ) -> None:
        if not api_key.strip():
            raise ValueError("GEMINI_API_KEY is not configured.")
        if not model.strip():
            raise ValueError("MODEL_GEMINI is not configured.")

        self._model = model.strip()
        self._generator = generator or GoogleGenAiImageGenerator(
            api_key=api_key,
            timeout_seconds=timeout_seconds,
        )

    @classmethod
    def from_environment(cls) -> "GeminiImageLocalizationProvider":
        """Builds the direct Gemini provider from AI-worker environment values."""
        return cls(
            api_key=os.getenv("GEMINI_API_KEY", ""),
            model=os.getenv("MODEL_GEMINI", DEFAULT_GEMINI_IMAGE_MODEL),
            timeout_seconds=get_positive_integer(
                os.getenv("GEMINI_IMAGE_TIMEOUT_SECONDS"),
                DEFAULT_TIMEOUT_SECONDS,
            ),
        )

    def localize(self, request: ImageLocalizationRequest) -> ImageLocalizationResult:
        """Generates translated and text-free images without persisting either."""
        source_size = get_image_size(request.image_bytes)

        with ThreadPoolExecutor(max_workers=MAX_PARALLEL_GENERATIONS) as executor:
            translated_future = executor.submit(
                self._generator.generate,
                self._model,
                request.image_bytes,
                request.mime_type,
                build_translation_prompt(request, requires_metadata=True),
            )
            inpainted_future = executor.submit(
                self._generator.generate,
                self._model,
                request.image_bytes,
                request.mime_type,
                build_inpainting_prompt(request),
            )
            translated_image = translated_future.result()
            inpainted_image = inpainted_future.result()

        response_context, text_regions = parse_text_metadata(
            content=translated_image.content,
            source_size=source_size,
            output_size=inpainted_image.size,
            target_language=request.target_language,
        )

        return ImageLocalizationResult(
            image_data_url=translated_image.data_url,
            inpainted_data_url=inpainted_image.data_url,
            context=response_context or request.context,
            text=text_regions,
        )


def generated_image_from_gemini_response(response: object) -> GeneratedImage:
    """Extracts the first image and all text parts from a Gemini SDK response."""
    response_parts = getattr(response, "parts", None)
    if not isinstance(response_parts, list):
        response_parts = list(response_parts or ())

    image_bytes: bytes | None = None
    text_parts: list[str] = []

    for part in response_parts:
        text = getattr(part, "text", None)
        if isinstance(text, str) and text.strip():
            text_parts.append(text)

        inline_data = getattr(part, "inline_data", None)
        data = getattr(inline_data, "data", None)
        if image_bytes is None and isinstance(data, bytes) and data:
            image_bytes = data

    if image_bytes is None:
        raise RuntimeError(gemini_empty_image_message(response))

    data_url, image_size = normalize_image_bytes(image_bytes)
    return GeneratedImage(
        data_url=data_url,
        size=image_size,
        content="\n".join(text_parts),
    )


def gemini_empty_image_message(response: object) -> str:
    """Builds a safe diagnostic when Gemini finishes without an image part."""
    reasons: list[str] = []

    for candidate in getattr(response, "candidates", None) or ():
        finish_reason = getattr(candidate, "finish_reason", None)
        reason_name = getattr(finish_reason, "name", None)
        reason = reason_name or str(finish_reason or "").strip()
        if reason and reason not in reasons:
            reasons.append(reason)

    suffix = f" Finish reason: {', '.join(reasons)}." if reasons else ""
    return f"Gemini did not return a generated image.{suffix}"


def get_positive_integer(value: str | None, fallback: int) -> int:
    """Parses a positive environment integer with a safe default."""
    if not value:
        return fallback

    try:
        parsed = int(value)
    except ValueError:
        return fallback

    return parsed if parsed > 0 else fallback
