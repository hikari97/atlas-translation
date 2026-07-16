import cv2
import numpy as np
from PIL import Image


INPAINT_PADDING_RATIO = 0.08
INPAINT_MIN_PADDING = 4
INPAINT_MAX_PADDING = 24
INPAINT_BORDER_SAFETY = 2
INPAINT_RADIUS = 3.0


def _to_int(value: object, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _extract_text_box(region: dict) -> tuple[int, int, int, int] | None:
    text_box = region.get("textBox")

    if isinstance(text_box, dict):
        x = _to_int(text_box.get("x"))
        y = _to_int(text_box.get("y"))
        width = _to_int(text_box.get("width"))
        height = _to_int(text_box.get("height"))

        if width > 0 and height > 0:
            return (x, y, x + width, y + height)

    raw_box = region.get("textBoxRaw")

    if isinstance(raw_box, (list, tuple)) and len(raw_box) == 4:
        x1, y1, x2, y2 = (_to_int(value) for value in raw_box)

        if x2 > x1 and y2 > y1:
            return (x1, y1, x2, y2)

    x = _to_int(region.get("x"))
    y = _to_int(region.get("y"))
    width = _to_int(region.get("width"))
    height = _to_int(region.get("height"))

    if width <= 0 or height <= 0:
        return None

    return (x, y, x + width, y + height)


def _expanded_text_box(
    region: dict,
    image_width: int,
    image_height: int,
) -> tuple[int, int, int, int] | None:
    text_box = _extract_text_box(region)

    if text_box is None:
        return None

    x1, y1, x2, y2 = text_box
    width = x2 - x1
    height = y2 - y1
    border_width = max(0, _to_int(region.get("lineWidth")))
    padding_x = min(
        INPAINT_MAX_PADDING,
        max(
            INPAINT_MIN_PADDING,
            border_width + INPAINT_BORDER_SAFETY,
            round(width * INPAINT_PADDING_RATIO),
        ),
    )
    padding_y = min(
        INPAINT_MAX_PADDING,
        max(
            INPAINT_MIN_PADDING,
            border_width + INPAINT_BORDER_SAFETY,
            round(height * INPAINT_PADDING_RATIO),
        ),
    )
    left = max(0, min(x1 - padding_x, image_width - 1))
    top = max(0, min(y1 - padding_y, image_height - 1))
    right = max(0, min(x2 + padding_x, image_width))
    bottom = max(0, min(y2 + padding_y, image_height))

    if right <= left or bottom <= top:
        return None

    return (left, top, right, bottom)


def create_text_removal_mask(image: np.ndarray, regions: list[dict]) -> np.ndarray:
    """Builds a mask covering every translated text box, including text outlines."""
    image_height, image_width = image.shape[:2]
    mask = np.zeros((image_height, image_width), dtype=np.uint8)

    for region in regions:
        expanded_box = _expanded_text_box(region, image_width, image_height)

        if expanded_box is None:
            continue

        left, top, right, bottom = expanded_box
        cv2.rectangle(mask, (left, top), (right - 1, bottom - 1), 255, thickness=-1)

    return mask


def create_inpainted_image(image: np.ndarray, regions: list[dict]) -> Image.Image:
    """Removes all translated source text with a single OpenCV inpainting pass."""
    removal_mask = create_text_removal_mask(image, regions)

    if not np.any(removal_mask):
        inpainted_bgr = image.copy()
    else:
        inpainted_bgr = cv2.inpaint(
            image,
            removal_mask,
            INPAINT_RADIUS,
            cv2.INPAINT_TELEA,
        )

    return Image.fromarray(cv2.cvtColor(inpainted_bgr, cv2.COLOR_BGR2RGB))
