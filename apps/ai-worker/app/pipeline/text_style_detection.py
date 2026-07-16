from typing import TypedDict

import cv2
import numpy as np


DEFAULT_FILL_COLOR = "#0e0c0f"
DEFAULT_STROKE_COLOR = "#f9f7f9"
ANALYSIS_PADDING_RATIO = 0.18
MIN_PADDING = 3
MIN_COLOR_DISTANCE = 14.0
MAX_COLOR_DISTANCE = 42.0
BORDER_COLOR_DISTANCE = 22.0
BORDER_BACKGROUND_DISTANCE = 14.0
COLOR_COHERENCE_DISTANCE = 18.0
ANTIALIAS_BLEND_ERROR = 12.0
MAX_LINE_WIDTH = 12
MIN_BOX_SIZE = 8
MIN_BACKGROUND_PIXELS = 12
MIN_GLYPH_PIXELS = 6
MIN_CORE_PIXELS = 4


class TextStyle(TypedDict):
    fillColor: str
    strokeColor: str
    lineWidth: int
    addFontBorder: bool


def _normalize_box(
    box: list[int],
    width: int,
    height: int,
) -> list[int] | None:
    x1, y1, x2, y2 = [int(value) for value in box]
    left = max(0, min(min(x1, x2), width - 1))
    right = max(0, min(max(x1, x2), width))
    top = max(0, min(min(y1, y2), height - 1))
    bottom = max(0, min(max(y1, y2), height))

    if right - left < MIN_BOX_SIZE or bottom - top < MIN_BOX_SIZE:
        return None

    return [left, top, right, bottom]


def _color_to_hex(color_bgr: np.ndarray) -> str:
    blue, green, red = np.clip(np.rint(color_bgr), 0, 255).astype(np.uint8)
    return f"#{int(red):02x}{int(green):02x}{int(blue):02x}"


def _bgr_to_lab(color_bgr: np.ndarray) -> np.ndarray:
    pixel = np.clip(np.rint(color_bgr), 0, 255).astype(np.uint8).reshape(1, 1, 3)
    return cv2.cvtColor(pixel, cv2.COLOR_BGR2LAB).reshape(3).astype(np.float32)


def _lab_color_distance(first_bgr: np.ndarray, second_bgr: np.ndarray) -> float:
    return float(np.linalg.norm(_bgr_to_lab(first_bgr) - _bgr_to_lab(second_bgr)))


def _is_antialias_blend(
    fill_bgr: np.ndarray,
    background_bgr: np.ndarray,
    candidate_bgr: np.ndarray,
) -> bool:
    direction = fill_bgr.astype(np.float32) - background_bgr.astype(np.float32)
    denominator = float(np.dot(direction, direction))

    if denominator <= 1.0:
        return False

    candidate_direction = (
        candidate_bgr.astype(np.float32) - background_bgr.astype(np.float32)
    )
    blend_ratio = float(np.dot(candidate_direction, direction) / denominator)

    if not 0.08 < blend_ratio < 0.92:
        return False

    projected_color = background_bgr.astype(np.float32) + blend_ratio * direction
    blend_error = float(
        np.linalg.norm(candidate_bgr.astype(np.float32) - projected_color)
    )
    return blend_error <= ANTIALIAS_BLEND_ERROR


def _fallback_style(stroke_color: str = DEFAULT_STROKE_COLOR) -> TextStyle:
    return {
        "fillColor": DEFAULT_FILL_COLOR,
        "strokeColor": stroke_color,
        "lineWidth": 0,
        "addFontBorder": False,
    }


def detect_text_style(image: np.ndarray, text_box: list[int]) -> TextStyle:
    """Estimates glyph fill, outline color, and outline width from an image crop."""
    image_height, image_width = image.shape[:2]
    normalized = _normalize_box(text_box, image_width, image_height)

    if normalized is None:
        return _fallback_style()

    x1, y1, x2, y2 = normalized
    text_width = x2 - x1
    text_height = y2 - y1
    padding_x = max(MIN_PADDING, int(text_width * ANALYSIS_PADDING_RATIO))
    padding_y = max(MIN_PADDING, int(text_height * ANALYSIS_PADDING_RATIO))
    analysis_box = _normalize_box(
        [x1 - padding_x, y1 - padding_y, x2 + padding_x, y2 + padding_y],
        image_width,
        image_height,
    ) or normalized
    ax1, ay1, ax2, ay2 = analysis_box
    analysis_crop = image[ay1:ay2, ax1:ax2]

    if analysis_crop.size == 0:
        return _fallback_style()

    local_x1 = max(0, x1 - ax1)
    local_y1 = max(0, y1 - ay1)
    local_x2 = min(analysis_crop.shape[1], x2 - ax1)
    local_y2 = min(analysis_crop.shape[0], y2 - ay1)
    background_mask = np.ones(analysis_crop.shape[:2], dtype=bool)
    background_mask[local_y1:local_y2, local_x1:local_x2] = False
    background_pixels = analysis_crop[background_mask]

    if background_pixels.shape[0] < MIN_BACKGROUND_PIXELS:
        background_pixels = np.concatenate(
            [
                analysis_crop[0, :, :],
                analysis_crop[-1, :, :],
                analysis_crop[:, 0, :],
                analysis_crop[:, -1, :],
            ],
            axis=0,
        )

    background_bgr = np.median(background_pixels, axis=0).astype(np.float32)
    background_color = _color_to_hex(background_bgr)
    text_crop = analysis_crop[local_y1:local_y2, local_x1:local_x2]

    if text_crop.size == 0:
        return _fallback_style(background_color)

    text_lab = cv2.cvtColor(text_crop, cv2.COLOR_BGR2LAB).astype(np.float32)
    background_lab = _bgr_to_lab(background_bgr)
    color_distances = np.linalg.norm(text_lab - background_lab, axis=2)
    adaptive_distance = float(np.percentile(color_distances, 70))
    segmentation_threshold = max(
        MIN_COLOR_DISTANCE,
        min(MAX_COLOR_DISTANCE, adaptive_distance),
    )
    text_mask = (color_distances >= segmentation_threshold).astype(np.uint8)
    text_mask = cv2.morphologyEx(
        text_mask,
        cv2.MORPH_CLOSE,
        np.ones((2, 2), dtype=np.uint8),
    )
    candidate_count = int(np.count_nonzero(text_mask))
    minimum_candidates = max(MIN_GLYPH_PIXELS, int(text_mask.size * 0.003))

    if candidate_count < minimum_candidates:
        return _fallback_style(background_color)

    distance_map = cv2.distanceTransform(text_mask, cv2.DIST_L2, 5)
    positive_distances = distance_map[text_mask > 0]
    core_threshold = max(1.0, float(np.percentile(positive_distances, 58)))
    core_mask = (distance_map >= core_threshold) & (text_mask > 0)
    core_pixels = text_crop[core_mask]

    if core_pixels.shape[0] < MIN_CORE_PIXELS:
        farthest_threshold = float(np.percentile(color_distances[text_mask > 0], 70))
        core_pixels = text_crop[
            (color_distances >= farthest_threshold) & (text_mask > 0)
        ]

    if core_pixels.shape[0] == 0:
        core_pixels = text_crop[text_mask > 0]

    fill_bgr = np.median(core_pixels, axis=0).astype(np.float32)
    outer_threshold = max(1.0, float(np.percentile(positive_distances, 36)))
    outer_mask = (distance_map <= outer_threshold) & (text_mask > 0)
    outer_pixels = text_crop[outer_mask]

    if outer_pixels.shape[0] < MIN_CORE_PIXELS:
        return {
            "fillColor": _color_to_hex(fill_bgr),
            "strokeColor": background_color,
            "lineWidth": 0,
            "addFontBorder": False,
        }

    stroke_bgr = np.median(outer_pixels, axis=0).astype(np.float32)
    stroke_lab = _bgr_to_lab(stroke_bgr)
    outer_lab = cv2.cvtColor(
        outer_pixels.reshape(-1, 1, 3),
        cv2.COLOR_BGR2LAB,
    ).reshape(-1, 3).astype(np.float32)
    outer_color_distances = np.linalg.norm(outer_lab - stroke_lab, axis=1)
    coherent_ratio = float(
        np.mean(outer_color_distances <= COLOR_COHERENCE_DISTANCE)
    )
    has_border = (
        _lab_color_distance(fill_bgr, stroke_bgr) >= BORDER_COLOR_DISTANCE
        and _lab_color_distance(stroke_bgr, background_bgr)
        >= BORDER_BACKGROUND_DISTANCE
        and coherent_ratio >= 0.5
        and not _is_antialias_blend(fill_bgr, background_bgr, stroke_bgr)
    )
    line_width = 0

    if has_border:
        coherent_outer_distances = distance_map[outer_mask][
            outer_color_distances <= COLOR_COHERENCE_DISTANCE
        ]

        if coherent_outer_distances.size > 0:
            line_width = int(
                np.clip(
                    round(float(np.percentile(coherent_outer_distances, 90))),
                    1,
                    MAX_LINE_WIDTH,
                )
            )

    return {
        "fillColor": _color_to_hex(fill_bgr),
        "strokeColor": _color_to_hex(stroke_bgr if has_border else background_bgr),
        "lineWidth": line_width,
        "addFontBorder": has_border,
    }
