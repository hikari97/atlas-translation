import base64
import json
import os
import tempfile
import threading
from functools import lru_cache
from pathlib import Path
from typing import Any

import cv2
import numpy as np
import requests
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont, ImageFilter

try:
    import pytesseract
except Exception:
    pytesseract = None

try:
    from google import genai
except Exception:
    genai = None


load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

from cypy.core import config
from cypy.core.providers import create_provider
from cypy.core.translator import (
    perkecil_daftar_potongan_jika_mosaik_terlalu_tinggi,
    terjemahkan_mosaik,
)
from cypy.core.utils import (
    buat_crop_lega_tapi_tidak_nyamber,
    mask_luar_box_utama,
    tulis_teks_di_balon,
)
from cypy.core.yolo_onnx import YOLOONNX

from app.pipeline.text_style_detection import detect_text_style
from app.pipeline.inpainting import create_inpainted_image


_yolo_lock = threading.Lock()

DEFAULT_RESPONSE_FONT_SIZE = 36
DEFAULT_RESPONSE_FONT_FAMILY = "WildWords"
DEFAULT_RESPONSE_FILL_COLOR = "#0e0c0f"
DEFAULT_RESPONSE_STROKE_COLOR = "#f9f7f9"
RIGHT_TO_LEFT_LANGUAGES = {"ar", "arabic", "fa", "he", "ur"}


def is_debug_image_enabled() -> bool:
    return os.getenv("SAVE_DEBUG_IMAGES", "false").lower() in {"1", "true", "yes"}


# ==========================================================
# BASIC IO
# ==========================================================

def download_image(image_url: str, workdir: Path) -> Path:
    response = requests.get(image_url, timeout=60)
    response.raise_for_status()

    image_path = workdir / "input.png"
    image_path.write_bytes(response.content)

    return image_path


@lru_cache(maxsize=1)
def get_yolo_model() -> YOLOONNX:
    if not os.path.exists(config.MODEL_YOLO):
        raise FileNotFoundError(f"YOLO model not found: {config.MODEL_YOLO}")

    return YOLOONNX(config.MODEL_YOLO)


def get_llm_provider(provider_name: str):
    provider_name = (provider_name or os.getenv("LLM_PROVIDER") or "gemini").lower()

    api_key, model_name = config.get_provider_config(provider_name)

    env_map = {
        "gemini": ("GEMINI_API_KEY", "MODEL_GEMINI"),
        "openai": ("OPENAI_API_KEY", "MODEL_OPENAI"),
        "openrouter": ("OPENROUTER_API_KEY", "MODEL_OPENROUTER"),
        "zen": ("ZEN_API_KEY", "MODEL_ZEN"),
        "custom": ("CUSTOM_API_KEY", "MODEL_CUSTOM"),
    }

    api_env, model_env = env_map.get(provider_name, ("", ""))
    api_key = os.getenv(api_env, api_key)
    model_name = os.getenv(model_env, model_name)

    kwargs: dict[str, Any] = {}

    if provider_name == "custom":
        kwargs["base_url"] = os.getenv(
            "CUSTOM_BASE_URL",
            getattr(config, "CUSTOM_BASE_URL", ""),
        )

    return create_provider(
        provider_name,
        api_key=api_key,
        model_name=model_name,
        **kwargs,
    )


# ==========================================================
# BOX HELPERS
# ==========================================================

def normalize_box(box: list[int], width: int, height: int) -> list[int] | None:
    x1, y1, x2, y2 = [int(v) for v in box]

    left = min(x1, x2)
    right = max(x1, x2)
    top = min(y1, y2)
    bottom = max(y1, y2)

    left = max(0, min(left, width - 1))
    right = max(0, min(right, width))
    top = max(0, min(top, height - 1))
    bottom = max(0, min(bottom, height))

    if right <= left or bottom <= top:
        return None

    if (right - left) < 8 or (bottom - top) < 8:
        return None

    return [left, top, right, bottom]


def box_area(box: list[int]) -> int:
    x1, y1, x2, y2 = box
    return max(0, x2 - x1) * max(0, y2 - y1)


def box_iou(a: list[int], b: list[int]) -> float:
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b

    inter_x1 = max(ax1, bx1)
    inter_y1 = max(ay1, by1)
    inter_x2 = min(ax2, bx2)
    inter_y2 = min(ay2, by2)

    inter_w = max(0, inter_x2 - inter_x1)
    inter_h = max(0, inter_y2 - inter_y1)
    inter_area = inter_w * inter_h

    area_a = max(1, (ax2 - ax1) * (ay2 - ay1))
    area_b = max(1, (bx2 - bx1) * (by2 - by1))

    return inter_area / float(area_a + area_b - inter_area)


def intersection_box(a: list[int], b: list[int]) -> list[int] | None:
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b

    x1 = max(ax1, bx1)
    y1 = max(ay1, by1)
    x2 = min(ax2, bx2)
    y2 = min(ay2, by2)

    if x2 <= x1 or y2 <= y1:
        return None

    return [x1, y1, x2, y2]


def intersection_over_min_area(a: list[int], b: list[int]) -> float:
    inter = intersection_box(a, b)

    if inter is None:
        return 0.0

    inter_area = box_area(inter)
    min_area = max(1, min(box_area(a), box_area(b)))

    return inter_area / float(min_area)


def box_center(box: list[int]) -> tuple[float, float]:
    x1, y1, x2, y2 = box
    return ((x1 + x2) / 2.0, (y1 + y2) / 2.0)


def point_inside_box(px: float, py: float, box: list[int]) -> bool:
    x1, y1, x2, y2 = box
    return x1 <= px <= x2 and y1 <= py <= y2


def nms_boxes(boxes: list[list[int]], iou_threshold: float = 0.45) -> list[list[int]]:
    if not boxes:
        return []

    boxes = sorted(boxes, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))

    kept: list[list[int]] = []

    for box in boxes:
        duplicate = False

        for kept_box in kept:
            if box_iou(box, kept_box) >= iou_threshold:
                duplicate = True
                break

        if not duplicate:
            kept.append(box)

    return kept


def is_panel_like_box(box: list[int], image_width: int, image_height: int) -> bool:
    x1, y1, x2, y2 = box

    w = max(1, x2 - x1)
    h = max(1, y2 - y1)

    width_ratio = w / max(1, image_width)
    height_ratio = h / max(1, image_height)
    area_ratio = (w * h) / max(1, image_width * image_height)

    if width_ratio >= 0.88 and h >= 350:
        return True

    if area_ratio >= 0.04:
        return True

    if height_ratio >= 0.12:
        return True

    return False


def is_reasonable_text_or_bubble_box(
    box: list[int],
    image_width: int,
    image_height: int,
) -> bool:
    x1, y1, x2, y2 = box

    w = max(1, x2 - x1)
    h = max(1, y2 - y1)

    aspect = w / max(1, h)
    width_ratio = w / max(1, image_width)
    area_ratio = (w * h) / max(1, image_width * image_height)

    if w < 16 or h < 10:
        return False

    if is_panel_like_box(box, image_width, image_height):
        return False

    if width_ratio >= 0.90 and h >= 260:
        return False

    if aspect < 0.12 or aspect > 10:
        return False

    if area_ratio >= 0.045:
        return False

    return True


def expand_box(
    box: list[int],
    image_width: int,
    image_height: int,
    pad_ratio: float = 0.06,
    min_pad: int = 4,
) -> list[int] | None:
    x1, y1, x2, y2 = box

    w = max(1, x2 - x1)
    h = max(1, y2 - y1)

    pad_x = max(min_pad, int(w * pad_ratio))
    pad_y = max(min_pad, int(h * pad_ratio))

    return normalize_box(
        [x1 - pad_x, y1 - pad_y, x2 + pad_x, y2 + pad_y],
        image_width,
        image_height,
    )


def adjust_text_box(
    box: list[int],
    image_width: int,
    image_height: int,
) -> list[int] | None:
    """
    TextBox dibuat mengikuti posisi original text.
    Default tanpa offset dan tanpa padding.
    Jika perlu kalibrasi, atur lewat .env.
    """

    x1, y1, x2, y2 = box

    offset_x = int(os.getenv("TEXTBOX_OFFSET_X", "0"))
    offset_y = int(os.getenv("TEXTBOX_OFFSET_Y", "0"))

    pad_left = int(os.getenv("TEXTBOX_PAD_LEFT", "0"))
    pad_top = int(os.getenv("TEXTBOX_PAD_TOP", "0"))
    pad_right = int(os.getenv("TEXTBOX_PAD_RIGHT", "0"))
    pad_bottom = int(os.getenv("TEXTBOX_PAD_BOTTOM", "0"))

    adjusted = [
        x1 + offset_x - pad_left,
        y1 + offset_y - pad_top,
        x2 + offset_x + pad_right,
        y2 + offset_y + pad_bottom,
    ]

    return normalize_box(adjusted, image_width, image_height)


def save_debug_boxes(
    img: np.ndarray,
    boxes: list[list[int]],
    filename: str = "debug_boxes.png",
):
    if not is_debug_image_enabled():
        return

    debug_img = img.copy()

    for index, box in enumerate(boxes, start=1):
        x1, y1, x2, y2 = box

        cv2.rectangle(debug_img, (x1, y1), (x2, y2), (0, 0, 255), 2)
        cv2.putText(
            debug_img,
            str(index),
            (x1 + 4, y1 + 20),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 0, 255),
            2,
        )

    cv2.imwrite(filename, debug_img)
    print(f"[DEBUG] saved debug boxes: {os.path.abspath(filename)}", flush=True)


def save_debug_text_boxes(
    img: np.ndarray,
    bubbles: list[dict],
    filename: str = "debug_text_boxes.png",
):
    if not is_debug_image_enabled():
        return

    debug_img = img.copy()

    for index, bubble in enumerate(bubbles, start=1):
        bubble_box = bubble.get("bubbleBox") or {}
        text_box = bubble.get("textBox") or {}

        bx = int(bubble_box.get("x", 0))
        by = int(bubble_box.get("y", 0))
        bw = int(bubble_box.get("width", 0))
        bh = int(bubble_box.get("height", 0))

        tx = int(text_box.get("x", 0))
        ty = int(text_box.get("y", 0))
        tw = int(text_box.get("width", 0))
        th = int(text_box.get("height", 0))

        cv2.rectangle(debug_img, (bx, by), (bx + bw, by + bh), (0, 0, 255), 2)
        cv2.rectangle(debug_img, (tx, ty), (tx + tw, ty + th), (255, 0, 0), 2)

        cv2.putText(
            debug_img,
            str(index),
            (tx + 3, ty + 18),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (255, 0, 0),
            2,
        )

    cv2.imwrite(filename, debug_img)
    print(f"[DEBUG] saved debug text boxes: {os.path.abspath(filename)}", flush=True)


# ==========================================================
# TESSERACT OCR
# ==========================================================

def detect_text_box_with_tesseract(
    img: np.ndarray,
    candidate_box: list[int],
) -> dict | None:
    if pytesseract is None:
        return None

    image_height, image_width = img.shape[:2]

    normalized = normalize_box(candidate_box, image_width, image_height)

    if normalized is None:
        return None

    x1, y1, x2, y2 = normalized

    crop = img[y1:y2, x1:x2].copy()

    if crop.size == 0:
        return None

    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)

    scale = 2
    gray = cv2.resize(
        gray,
        None,
        fx=scale,
        fy=scale,
        interpolation=cv2.INTER_CUBIC,
    )

    gray = cv2.GaussianBlur(gray, (3, 3), 0)

    binary = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU,
    )[1]

    try:
        data = pytesseract.image_to_data(
            binary,
            output_type=pytesseract.Output.DICT,
            config="--psm 6",
        )
    except Exception as exc:
        print(f"[DEBUG] pytesseract failed: {repr(exc)}", flush=True)
        return None

    text_boxes = []
    texts = []
    confs = []

    for i in range(len(data["text"])):
        text = str(data["text"][i]).strip()

        try:
            conf = int(float(data["conf"][i]))
        except Exception:
            conf = -1

        if not text:
            continue

        if conf < 8:
            continue

        tx = int(data["left"][i] / scale)
        ty = int(data["top"][i] / scale)
        tw = int(data["width"][i] / scale)
        th = int(data["height"][i] / scale)

        if tw <= 2 or th <= 2:
            continue

        text_boxes.append([tx, ty, tx + tw, ty + th])
        texts.append(text)
        confs.append(conf)

    if not text_boxes:
        return None

    local_x1 = min(box[0] for box in text_boxes)
    local_y1 = min(box[1] for box in text_boxes)
    local_x2 = max(box[2] for box in text_boxes)
    local_y2 = max(box[3] for box in text_boxes)

    raw_text_box = [
        x1 + local_x1,
        y1 + local_y1,
        x1 + local_x2,
        y1 + local_y2,
    ]

    global_box = adjust_text_box(
        raw_text_box,
        image_width,
        image_height,
    )

    if global_box is None:
        return None

    gx1, gy1, gx2, gy2 = global_box
    joined_text = " ".join(texts)

    return {
        "text": joined_text,
        "box": [gx1, gy1, gx2, gy2],
        "x": gx1,
        "y": gy1,
        "width": gx2 - gx1,
        "height": gy2 - gy1,
        "avg_conf": sum(confs) / max(1, len(confs)),
        "word_count": len(texts),
        "char_count": sum(1 for ch in joined_text if ch.isalnum()),
    }


def is_useful_ocr_text(
    text: str,
    avg_conf: float = 0,
    word_count: int = 0,
    char_count: int = 0,
) -> bool:
    text = (text or "").strip()

    if text in {"...", "…", ".."}:
        return True

    if len(text) < 2:
        return False

    upper_text = text.upper()

    ignore_words = [
        "SOFTKOMIK",
        "KUNJUNGI",
        "WEBSITE",
        "VISIT",
        "COM",
        "ORG",
        "HTTP",
        "WWW",
        "JPEG",
        "PNG",
    ]

    if any(word in upper_text for word in ignore_words):
        return False

    alnum_count = sum(ch.isalnum() for ch in text)
    alpha_count = sum(ch.isalpha() for ch in text)
    digit_count = sum(ch.isdigit() for ch in text)
    symbol_count = sum(not ch.isalnum() and not ch.isspace() for ch in text)

    if alnum_count < 3:
        return False

    if alpha_count < 2 and digit_count == 0:
        return False

    if symbol_count > alnum_count:
        return False

    if avg_conf < 20 and char_count < 10:
        return False

    if word_count <= 1 and char_count < 4:
        return False

    bad_fragments = {
        "THE",
        "TO",
        "OF",
        "AND",
        "AS",
        "IT",
        "HE",
        "SHE",
        "YOU",
    }

    if upper_text in bad_fragments and avg_conf < 60:
        return False

    return True


# ==========================================================
# GEMINI DETECTOR
# ==========================================================

@lru_cache(maxsize=1)
def get_gemini_client():
    if genai is None:
        raise RuntimeError("google-genai belum terinstall. Jalankan: uv pip install google-genai")

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY belum ada di .env")

    return genai.Client(api_key=api_key)


def extract_json_array(text: str) -> list:
    text = (text or "").strip()

    if "```" in text:
        parts = text.split("```")
        if len(parts) >= 2:
            text = parts[1].strip()
            if text.lower().startswith("json"):
                text = text[4:].strip()

    start = text.find("[")
    end = text.rfind("]")

    if start == -1 or end == -1 or end <= start:
        raise ValueError(f"Gemini response tidak berisi JSON array: {text[:500]}")

    return json.loads(text[start:end + 1])


def gemini_box_to_pixel(
    box_2d: list[int | float],
    slice_width: int,
    slice_height: int,
    y_offset: int,
) -> list[int] | None:
    if not isinstance(box_2d, list) or len(box_2d) != 4:
        return None

    ymin, xmin, ymax, xmax = [float(v) for v in box_2d]

    x1 = int(xmin / 1000.0 * slice_width)
    y1 = int(ymin / 1000.0 * slice_height) + y_offset
    x2 = int(xmax / 1000.0 * slice_width)
    y2 = int(ymax / 1000.0 * slice_height) + y_offset

    return [x1, y1, x2, y2]


def detect_text_regions_gemini(img: np.ndarray) -> list[list[int]]:
    if os.getenv("USE_GEMINI_DETECTOR", "false").lower() != "true":
        return []

    image_height, image_width = img.shape[:2]

    model_name = (
        os.getenv("GEMINI_DETECT_MODEL")
        or os.getenv("MODEL_GEMINI")
        or "gemini-2.5-flash-lite"
    )

    try:
        client = get_gemini_client()
    except Exception as exc:
        print(f"[DEBUG][GeminiDetect] disabled: {repr(exc)}", flush=True)
        return []

    slice_height = int(os.getenv("GEMINI_DETECT_SLICE_HEIGHT", "1200"))
    overlap = int(os.getenv("GEMINI_DETECT_OVERLAP", "120"))
    step = max(1, slice_height - overlap)

    if image_height <= slice_height:
        y_starts = [0]
    else:
        y_starts = list(range(0, image_height, step))

    max_slices = int(os.getenv("MAX_GEMINI_DETECT_SLICES", "20"))
    y_starts = y_starts[:max_slices]

    all_boxes: list[list[int]] = []

    prompt = """
You are a comic/webtoon text-region detector.

Detect ONLY readable dialogue/narration text areas and speech bubbles that contain text.
Do NOT detect characters, clothes, background, panels, effects, watermark, website header, or empty bubbles.

Return ONLY valid JSON array. No markdown. No explanation.

Each item format:
[
  {
    "type": "speech_bubble" | "text_region" | "sfx",
    "text": "exact visible text if readable, otherwise empty string",
    "box_2d": [ymin, xmin, ymax, xmax],
    "confidence": 0.0
  }
]

Rules:
- box_2d must use [ymin, xmin, ymax, xmax].
- box_2d must be normalized to 0-1000 relative to the provided slice image.
- Prefer tight boxes around the original text.
- Include the bubble if the bubble contains readable dialogue.
- Exclude watermark like SOFTKOMIK, website text, and page header.
- Exclude pure image areas with no text.
"""

    print(
        f"[DEBUG][GeminiDetect] start model={model_name}, image={image_width}x{image_height}, slices={len(y_starts)}",
        flush=True,
    )

    for slice_index, y_start in enumerate(y_starts, start=1):
        y_end = min(image_height, y_start + slice_height)
        crop = img[y_start:y_end, 0:image_width].copy()

        if crop.size == 0:
            continue

        crop_h, crop_w = crop.shape[:2]
        pil_image = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))

        try:
            response = client.models.generate_content(
                model=model_name,
                contents=[prompt, pil_image],
            )

            raw_text = getattr(response, "text", "") or ""
            items = extract_json_array(raw_text)

        except Exception as exc:
            print(
                f"[DEBUG][GeminiDetect] slice #{slice_index} failed: {repr(exc)}",
                flush=True,
            )
            continue

        slice_boxes = []

        for item in items:
            if not isinstance(item, dict):
                continue

            text = str(item.get("text", "") or "").strip()
            box_2d = item.get("box_2d")

            upper_text = text.upper()

            if any(word in upper_text for word in ["SOFTKOMIK", "KUNJUNGI", "WEBSITE", "HTTP", "WWW"]):
                continue

            pixel_box = gemini_box_to_pixel(
                box_2d=box_2d,
                slice_width=crop_w,
                slice_height=crop_h,
                y_offset=y_start,
            )

            if pixel_box is None:
                continue

            normalized = normalize_box(pixel_box, image_width, image_height)

            if normalized is None:
                continue

            if is_panel_like_box(normalized, image_width, image_height):
                continue

            x1, y1, x2, y2 = normalized
            w = x2 - x1
            h = y2 - y1

            if w < 20 or h < 14:
                continue

            if w >= image_width * 0.92 and h >= 300:
                continue

            expanded = expand_box(
                normalized,
                image_width,
                image_height,
                pad_ratio=0.03,
                min_pad=2,
            )

            if expanded is None:
                continue

            if not is_reasonable_text_or_bubble_box(expanded, image_width, image_height):
                continue

            all_boxes.append(expanded)
            slice_boxes.append(expanded)

        if slice_boxes:
            print(
                f"[DEBUG][GeminiDetect] slice #{slice_index} y={y_start}-{y_end}, boxes={len(slice_boxes)}",
                flush=True,
            )

    all_boxes = nms_boxes(all_boxes, iou_threshold=0.35)
    all_boxes.sort(key=lambda b: (b[1], b[0]))

    max_boxes = int(os.getenv("MAX_GEMINI_DETECT_BOXES", "25"))

    if len(all_boxes) > max_boxes:
        all_boxes = all_boxes[:max_boxes]

    print(
        "[DEBUG][GeminiDetect] final boxes:",
        len(all_boxes),
        all_boxes[:40],
        flush=True,
    )

    return all_boxes


# ==========================================================
# DIRECT OCR DETECTOR
# ==========================================================

def detect_text_regions_direct_ocr(img: np.ndarray) -> list[list[int]]:
    if pytesseract is None:
        return []

    image_height, image_width = img.shape[:2]

    slice_height = 1200
    overlap = 160
    step = slice_height - overlap

    if image_height <= slice_height:
        y_starts = [0]
    else:
        y_starts = list(range(0, image_height, step))

    all_boxes: list[list[int]] = []

    print(
        f"[DEBUG][DirectOCR] start, image={image_width}x{image_height}, slices={len(y_starts)}",
        flush=True,
    )

    for slice_index, y_start in enumerate(y_starts, start=1):
        y_end = min(image_height, y_start + slice_height)
        crop = img[y_start:y_end, 0:image_width].copy()

        if crop.size == 0:
            continue

        crop_h, crop_w = crop.shape[:2]

        gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)

        scale = 2
        gray_big = cv2.resize(
            gray,
            None,
            fx=scale,
            fy=scale,
            interpolation=cv2.INTER_CUBIC,
        )

        gray_big = cv2.GaussianBlur(gray_big, (3, 3), 0)

        binary = cv2.threshold(
            gray_big,
            0,
            255,
            cv2.THRESH_BINARY + cv2.THRESH_OTSU,
        )[1]

        try:
            data = pytesseract.image_to_data(
                binary,
                output_type=pytesseract.Output.DICT,
                config="--psm 6",
            )
        except Exception as exc:
            print(f"[DEBUG][DirectOCR] pytesseract failed: {repr(exc)}", flush=True)
            continue

        groups: dict[tuple[int, int, int], list[dict]] = {}

        for i in range(len(data["text"])):
            text = str(data["text"][i]).strip()

            if not text:
                continue

            try:
                conf = int(float(data["conf"][i]))
            except Exception:
                conf = -1

            if conf < 8:
                continue

            block_num = int(data.get("block_num", [0])[i])
            par_num = int(data.get("par_num", [0])[i])
            line_num = int(data.get("line_num", [0])[i])

            x = int(data["left"][i] / scale)
            y = int(data["top"][i] / scale)
            w = int(data["width"][i] / scale)
            h = int(data["height"][i] / scale)

            if w <= 2 or h <= 2:
                continue

            key = (block_num, par_num, line_num)

            groups.setdefault(key, []).append(
                {
                    "text": text,
                    "conf": conf,
                    "box": [x, y, x + w, y + h],
                }
            )

        for _, words in groups.items():
            if not words:
                continue

            joined_text = " ".join(word["text"] for word in words)
            avg_conf = sum(word["conf"] for word in words) / max(1, len(words))
            word_count = len(words)
            char_count = sum(1 for ch in joined_text if ch.isalnum())

            if not is_useful_ocr_text(
                text=joined_text,
                avg_conf=avg_conf,
                word_count=word_count,
                char_count=char_count,
            ):
                continue

            x1 = min(word["box"][0] for word in words)
            y1 = min(word["box"][1] for word in words)
            x2 = max(word["box"][2] for word in words)
            y2 = max(word["box"][3] for word in words)

            local_box = normalize_box([x1, y1, x2, y2], crop_w, crop_h)

            if local_box is None:
                continue

            lx1, ly1, lx2, ly2 = local_box

            global_box = normalize_box(
                [lx1, ly1 + y_start, lx2, ly2 + y_start],
                image_width,
                image_height,
            )

            if global_box is None:
                continue

            final_box = expand_box(
                global_box,
                image_width,
                image_height,
                pad_ratio=0.03,
                min_pad=2,
            )

            if final_box is None:
                continue

            if is_panel_like_box(final_box, image_width, image_height):
                continue

            if not is_reasonable_text_or_bubble_box(final_box, image_width, image_height):
                continue

            all_boxes.append(final_box)

    all_boxes = nms_boxes(all_boxes, iou_threshold=0.35)
    all_boxes.sort(key=lambda b: (b[1], b[0]))

    print(
        "[DEBUG][DirectOCR] final boxes:",
        len(all_boxes),
        all_boxes[:40],
        flush=True,
    )

    return all_boxes


# ==========================================================
# OCR FILTER
# ==========================================================

def filter_boxes_by_ocr_text(
    img: np.ndarray,
    boxes: list[list[int]],
) -> list[list[int]]:
    if pytesseract is None:
        print("[DEBUG] pytesseract tidak tersedia, skip OCR filter", flush=True)
        return boxes

    image_height, image_width = img.shape[:2]

    candidates: list[dict] = []

    for index, box in enumerate(boxes, start=1):
        normalized = normalize_box(box, image_width, image_height)

        if normalized is None:
            continue

        if is_panel_like_box(normalized, image_width, image_height):
            print(f"[DEBUG] OCR filter skip panel #{index}: {normalized}", flush=True)
            continue

        ocr = detect_text_box_with_tesseract(img, normalized)

        if not ocr:
            print(f"[DEBUG] OCR filter skip #{index}: no text {normalized}", flush=True)
            continue

        text = ocr.get("text", "")
        avg_conf = float(ocr.get("avg_conf", 0))
        word_count = int(ocr.get("word_count", 0))
        char_count = int(ocr.get("char_count", 0))
        text_box = ocr.get("box")

        if not text_box:
            continue

        if not is_useful_ocr_text(
            text=text,
            avg_conf=avg_conf,
            word_count=word_count,
            char_count=char_count,
        ):
            print(
                f"[DEBUG] OCR filter skip #{index}: useless text={repr(text)} "
                f"conf={avg_conf:.1f} words={word_count} chars={char_count} box={normalized}",
                flush=True,
            )
            continue

        tx1, ty1, tx2, ty2 = text_box

        text_w = tx2 - tx1
        text_h = ty2 - ty1

        if text_w < 12 or text_h < 8:
            continue

        final_box = normalize_box(
            text_box,
            image_width,
            image_height,
        )

        if final_box is None:
            continue

        if not is_reasonable_text_or_bubble_box(final_box, image_width, image_height):
            continue

        candidates.append(
            {
                "box": final_box,
                "candidateBox": normalized,
                "textBox": text_box,
                "text": text,
                "avg_conf": avg_conf,
                "word_count": word_count,
                "char_count": char_count,
                "text_area": text_w * text_h,
            }
        )

        print(
            f"[DEBUG] OCR candidate keep #{index}: text={repr(text)} "
            f"conf={avg_conf:.1f} words={word_count} "
            f"candidateBox={normalized} textBox={text_box} finalBox={final_box}",
            flush=True,
        )

    if not candidates:
        print("[DEBUG] OCR filter: no candidates", flush=True)
        return []

    candidates.sort(
        key=lambda c: (
            c["char_count"],
            c["word_count"],
            c["avg_conf"],
            c["text_area"],
        ),
        reverse=True,
    )

    kept: list[dict] = []

    for candidate in candidates:
        c_box = candidate["box"]
        c_text_box = candidate["textBox"]
        c_text = candidate["text"].upper().strip()

        should_skip = False

        for existing in kept:
            e_box = existing["box"]
            e_text_box = existing["textBox"]
            e_text = existing["text"].upper().strip()

            box_overlap = intersection_over_min_area(c_box, e_box)
            text_overlap = intersection_over_min_area(c_text_box, e_text_box)

            cx, cy = box_center(c_text_box)
            center_inside_existing = point_inside_box(cx, cy, e_box)

            if text_overlap >= 0.45:
                should_skip = True
                break

            if center_inside_existing and box_overlap >= 0.25:
                should_skip = True
                break

            if len(c_text) >= 3 and c_text in e_text:
                should_skip = True
                break

        if should_skip:
            print(
                f"[DEBUG] OCR dedup skip: text={repr(candidate['text'])} box={candidate['box']}",
                flush=True,
            )
            continue

        kept.append(candidate)

    kept.sort(key=lambda c: (c["box"][1], c["box"][0]))

    final_boxes = [c["box"] for c in kept]

    max_regions = int(os.getenv("MAX_OCR_REGIONS", "18"))

    if len(final_boxes) > max_regions:
        print(
            f"[DEBUG] OCR filter limit boxes {len(final_boxes)} -> {max_regions}",
            flush=True,
        )
        final_boxes = final_boxes[:max_regions]

    print(
        "[DEBUG] OCR final boxes:",
        len(final_boxes),
        final_boxes,
        flush=True,
    )

    return final_boxes


# ==========================================================
# OPENCV FALLBACK
# ==========================================================

def detect_bubble_boxes_opencv(img: np.ndarray) -> list[list[int]]:
    image_height, image_width = img.shape[:2]

    slice_height = 1200
    overlap = 180
    step = slice_height - overlap

    if image_height <= slice_height:
        y_starts = [0]
    else:
        y_starts = list(range(0, image_height, step))

    all_boxes: list[list[int]] = []

    print(
        f"[DEBUG][OpenCV] start fallback, image={image_width}x{image_height}, slices={len(y_starts)}",
        flush=True,
    )

    for slice_index, y_start in enumerate(y_starts, start=1):
        y_end = min(image_height, y_start + slice_height)
        crop = img[y_start:y_end, 0:image_width].copy()

        if crop.size == 0:
            continue

        crop_h, crop_w = crop.shape[:2]

        hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)

        white_mask = cv2.inRange(
            hsv,
            np.array([0, 0, 175], dtype=np.uint8),
            np.array([179, 95, 255], dtype=np.uint8),
        )

        kernel_open = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        kernel_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))

        white_mask = cv2.morphologyEx(white_mask, cv2.MORPH_OPEN, kernel_open)
        white_mask = cv2.morphologyEx(white_mask, cv2.MORPH_CLOSE, kernel_close)

        contours, _ = cv2.findContours(
            white_mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE,
        )

        for contour in contours:
            area = cv2.contourArea(contour)

            if area < 250:
                continue

            x, y, w, h = cv2.boundingRect(contour)

            local_box = normalize_box([x, y, x + w, y + h], crop_w, crop_h)

            if local_box is None:
                continue

            lx1, ly1, lx2, ly2 = local_box

            touches_left = lx1 <= 2
            touches_right = lx2 >= crop_w - 2
            touches_top = ly1 <= 2
            touches_bottom = ly2 >= crop_h - 2

            if (touches_left and touches_right) or (touches_top and touches_bottom):
                continue

            global_box = normalize_box(
                [lx1, ly1 + y_start, lx2, ly2 + y_start],
                image_width,
                image_height,
            )

            if global_box is None:
                continue

            global_box = expand_box(global_box, image_width, image_height)

            if global_box is None:
                continue

            if is_reasonable_text_or_bubble_box(global_box, image_width, image_height):
                all_boxes.append(global_box)

        gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        edges = cv2.Canny(blurred, 45, 140)

        kernel_edge = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        edges = cv2.dilate(edges, kernel_edge, iterations=1)
        edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel_edge)

        edge_contours, _ = cv2.findContours(
            edges,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE,
        )

        for contour in edge_contours:
            area = cv2.contourArea(contour)
            perimeter = cv2.arcLength(contour, True)

            if area < 180 or perimeter <= 0:
                continue

            x, y, w, h = cv2.boundingRect(contour)

            local_box = normalize_box([x, y, x + w, y + h], crop_w, crop_h)

            if local_box is None:
                continue

            lx1, ly1, lx2, ly2 = local_box

            bw = lx2 - lx1
            bh = ly2 - ly1

            if bw < 30 or bh < 18:
                continue

            circularity = 4.0 * np.pi * area / max(1.0, perimeter * perimeter)

            if circularity < 0.08:
                continue

            global_box = normalize_box(
                [lx1, ly1 + y_start, lx2, ly2 + y_start],
                image_width,
                image_height,
            )

            if global_box is None:
                continue

            global_box = expand_box(global_box, image_width, image_height)

            if global_box is None:
                continue

            if is_reasonable_text_or_bubble_box(global_box, image_width, image_height):
                all_boxes.append(global_box)

    unique_boxes: list[list[int]] = []
    seen = set()

    for box in all_boxes:
        key = tuple(box)

        if key in seen:
            continue

        seen.add(key)
        unique_boxes.append(box)

    boxes = nms_boxes(unique_boxes, iou_threshold=0.35)
    boxes.sort(key=lambda b: (b[1], b[0]))

    print(
        "[DEBUG][OpenCV] final fallback boxes:",
        len(boxes),
        boxes[:30],
        flush=True,
    )

    return boxes


# ==========================================================
# HYBRID DETECTOR
# ==========================================================

def detect_bubble_boxes(img: np.ndarray, image_path: str) -> list[list[int]]:
    yolo_model = get_yolo_model()

    image_height, image_width = img.shape[:2]

    print(f"[DEBUG] image size = {image_width}x{image_height}", flush=True)

    slice_height = 1400
    overlap = 220
    step = slice_height - overlap

    if image_height <= slice_height:
        y_starts = [0]
    else:
        y_starts = list(range(0, image_height, step))

    prediction_stages = [
        {"conf": 0.25, "iou": 0.45},
        {"conf": 0.15, "iou": 0.45},
        {"conf": 0.08, "iou": 0.45},
        {"conf": 0.04, "iou": 0.45},
    ]

    raw_boxes: list[list[int]] = []

    print(f"[DEBUG] total YOLO slices = {len(y_starts)}", flush=True)

    for slice_index, y_start in enumerate(y_starts, start=1):
        y_end = min(image_height, y_start + slice_height)
        crop = img[y_start:y_end, 0:image_width].copy()

        if crop.size == 0:
            continue

        tmp_path = None

        try:
            with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
                tmp_path = tmp.name

            cv2.imwrite(tmp_path, crop)

            slice_boxes_count = 0

            for stage in prediction_stages:
                with _yolo_lock:
                    results = yolo_model.predict(
                        source=tmp_path,
                        conf=stage["conf"],
                        iou=stage["iou"],
                        verbose=False,
                    )

                for box in results[0].boxes:
                    local_raw_box = [int(v) for v in box.xyxy[0]]

                    local_box = normalize_box(
                        local_raw_box,
                        image_width,
                        y_end - y_start,
                    )

                    if local_box is None:
                        continue

                    lx1, ly1, lx2, ly2 = local_box

                    global_box = normalize_box(
                        [lx1, ly1 + y_start, lx2, ly2 + y_start],
                        image_width,
                        image_height,
                    )

                    if global_box is None:
                        continue

                    raw_boxes.append(global_box)
                    slice_boxes_count += 1

            if slice_boxes_count > 0:
                print(
                    f"[DEBUG] YOLO slice #{slice_index} y={y_start}-{y_end}, "
                    f"raw boxes={slice_boxes_count}",
                    flush=True,
                )

        finally:
            if tmp_path and os.path.exists(tmp_path):
                os.remove(tmp_path)

    unique_yolo_boxes: list[list[int]] = []
    seen = set()

    for box in raw_boxes:
        key = tuple(box)

        if key in seen:
            continue

        seen.add(key)
        unique_yolo_boxes.append(box)

    yolo_boxes = [
        box
        for box in unique_yolo_boxes
        if is_reasonable_text_or_bubble_box(box, image_width, image_height)
    ]

    yolo_boxes = nms_boxes(yolo_boxes, iou_threshold=0.45)
    yolo_boxes.sort(key=lambda b: (b[1], b[0]))

    print(
        "[DEBUG] YOLO boxes:",
        len(yolo_boxes),
        yolo_boxes[:30],
        flush=True,
    )

    opencv_boxes = detect_bubble_boxes_opencv(img)
    direct_ocr_boxes = detect_text_regions_direct_ocr(img)
    gemini_boxes = detect_text_regions_gemini(img)

    print("[DEBUG] OpenCV boxes:", len(opencv_boxes), opencv_boxes[:30], flush=True)
    print("[DEBUG] DirectOCR boxes:", len(direct_ocr_boxes), direct_ocr_boxes[:30], flush=True)
    print("[DEBUG] Gemini boxes:", len(gemini_boxes), gemini_boxes[:30], flush=True)

    boxes = nms_boxes(
        yolo_boxes + opencv_boxes + direct_ocr_boxes + gemini_boxes,
        iou_threshold=0.35,
    )

    boxes = [
        box
        for box in boxes
        if is_reasonable_text_or_bubble_box(box, image_width, image_height)
    ]

    boxes = nms_boxes(boxes, iou_threshold=0.35)
    boxes.sort(key=lambda b: (b[1], b[0]))

    print(
        "[DEBUG] final boxes before OCR filter:",
        len(boxes),
        boxes[:60],
        flush=True,
    )

    ocr_filtered_boxes = filter_boxes_by_ocr_text(img, boxes)

    print(
        "[DEBUG] final boxes after OCR filter:",
        len(ocr_filtered_boxes),
        ocr_filtered_boxes[:60],
        flush=True,
    )

    if not ocr_filtered_boxes and boxes:
        print(
            "[DEBUG] OCR filter removed all boxes, fallback pakai boxes awal",
            flush=True,
        )
        ocr_filtered_boxes = boxes[: int(os.getenv("MAX_OCR_REGIONS", "18"))]

    save_debug_boxes(img, ocr_filtered_boxes, "debug_boxes.png")

    return ocr_filtered_boxes


# ==========================================================
# MOSAIC
# ==========================================================

def build_cypy_mosaic(
    img: np.ndarray,
    boxes: list[list[int]],
) -> tuple[Image.Image | None, dict[str, tuple[int, int, int, int]]]:
    height, width = img.shape[:2]

    pieces: list[tuple[str, Image.Image]] = []
    coord_map: dict[str, tuple[int, int, int, int]] = {}

    for index, box in enumerate(boxes, start=1):
        normalized_box = normalize_box(box, width, height)

        if normalized_box is None:
            continue

        x1, y1, x2, y2 = normalized_box

        box_w = max(1, x2 - x1)
        box_h = max(1, y2 - y1)

        pad_x = max(config.MIN_PAD, int(box_w * config.PAD_X_RATIO))
        pad_y = max(config.MIN_PAD, int(box_h * config.PAD_Y_RATIO))

        crop_x1, crop_y1, crop_x2, crop_y2 = buat_crop_lega_tapi_tidak_nyamber(
            [x1, y1, x2, y2],
            boxes,
            width,
            height,
            pad_x,
            pad_y,
        )

        crop_box = normalize_box(
            [crop_x1, crop_y1, crop_x2, crop_y2],
            width,
            height,
        )

        if crop_box is None:
            continue

        crop_x1, crop_y1, crop_x2, crop_y2 = crop_box

        crop = img[crop_y1:crop_y2, crop_x1:crop_x2].copy()

        if crop.size == 0:
            continue

        if getattr(config, "MASK_AREA_LUAR_BOX", True):
            crop = mask_luar_box_utama(
                crop,
                crop_x1,
                crop_y1,
                x1,
                y1,
                x2,
                y2,
            )

        crop_pil = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))

        if config.SKALA_POTONGAN_MOSAIK != 1:
            new_size = (
                max(1, int(crop_pil.width * config.SKALA_POTONGAN_MOSAIK)),
                max(1, int(crop_pil.height * config.SKALA_POTONGAN_MOSAIK)),
            )
            crop_pil = crop_pil.resize(new_size, Image.Resampling.LANCZOS)

        bubble_id = str(index)
        pieces.append((bubble_id, crop_pil))
        coord_map[bubble_id] = (x1, y1, x2, y2)

    if not pieces:
        return None, coord_map

    pieces = perkecil_daftar_potongan_jika_mosaik_terlalu_tinggi(
        pieces,
        max_tinggi_mosaik=config.MAX_TINGGI_MOSAIK,
        jarak_antar_potongan=config.JARAK_ANTAR_POTONGAN,
        padding_atas_bawah=20,
    )

    mosaic_width = max(
        config.LEBAR_MOSAIK_MIN,
        max(piece.width for _, piece in pieces)
        + config.MARGIN_KIRI_NOMOR
        + config.MARGIN_KANAN,
    )

    mosaic_height = (
        sum(piece.height for _, piece in pieces)
        + len(pieces) * config.JARAK_ANTAR_POTONGAN
        + 20
    )

    mosaic = Image.new("RGB", (mosaic_width, mosaic_height), color=(255, 255, 255))
    draw = ImageDraw.Draw(mosaic)

    try:
        number_font = ImageFont.truetype(config.FONT_MANGA, 40)
    except Exception:
        number_font = ImageFont.load_default()

    y_offset = 10

    for bubble_id, piece in pieces:
        draw.text(
            (5, y_offset + (piece.height // 2) - 20),
            bubble_id,
            fill=(255, 0, 0),
            font=number_font,
        )

        mosaic.paste(piece, (config.MARGIN_KIRI_NOMOR, y_offset))
        y_offset += piece.height + config.JARAK_ANTAR_POTONGAN

    if is_debug_image_enabled():
        mosaic.save("debug_mosaic.png")
        print(
            f"[DEBUG] saved debug mosaic: {os.path.abspath('debug_mosaic.png')}",
            flush=True,
        )

    return mosaic, coord_map


# ==========================================================
# RESPONSE + RENDER
# ==========================================================

def make_region_response(
    region_id: str,
    bubble_box: list[int],
    text_box: list[int],
    image_width: int,
    image_height: int,
    translated_text: str,
    original_text: str = "",
    source: str = "hybrid_yolo_opencv_ocr_gemini",
    confidence: float = 0.95,
) -> dict:
    bx1, by1, bx2, by2 = bubble_box
    tx1, ty1, tx2, ty2 = text_box

    bw = max(1, bx2 - bx1)
    bh = max(1, by2 - by1)

    tw = max(1, tx2 - tx1)
    th = max(1, ty2 - ty1)

    return {
        "id": str(region_id),
        "type": "speech_bubble",
        "source": source,
        "confidence": confidence,

        "x": int(tx1),
        "y": int(ty1),
        "width": int(tw),
        "height": int(th),

        "bubbleBox": {
            "x": int(bx1),
            "y": int(by1),
            "width": int(bw),
            "height": int(bh),
        },

        "textBox": {
            "x": int(tx1),
            "y": int(ty1),
            "width": int(tw),
            "height": int(th),
        },

        "box": [int(bx1), int(by1), int(bx2), int(by2)],
        "textBoxRaw": [int(tx1), int(ty1), int(tx2), int(ty2)],

        "xPercent": float(tx1 / max(1, image_width)),
        "yPercent": float(ty1 / max(1, image_height)),
        "widthPercent": float(tw / max(1, image_width)),
        "heightPercent": float(th / max(1, image_height)),

        "bubbleXPercent": float(bx1 / max(1, image_width)),
        "bubbleYPercent": float(by1 / max(1, image_height)),
        "bubbleWidthPercent": float(bw / max(1, image_width)),
        "bubbleHeightPercent": float(bh / max(1, image_height)),

        "textXPercent": float(tx1 / max(1, image_width)),
        "textYPercent": float(ty1 / max(1, image_height)),
        "textWidthPercent": float(tw / max(1, image_width)),
        "textHeightPercent": float(th / max(1, image_height)),

        "originalText": original_text,
        "translatedText": translated_text,
    }


def render_translations_to_image(
    img: np.ndarray,
    translations: dict,
    coord_map: dict[str, tuple[int, int, int, int]],
    target_language: str,
) -> tuple[Image.Image, list[dict]]:
    image_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    image_width, image_height = image_pil.size

    bubbles: list[dict] = []

    for bubble_id, value in translations.items():
        bubble_id = str(bubble_id)

        if bubble_id not in coord_map:
            continue

        if isinstance(value, dict):
            translated_text = (
                value.get("translated_text")
                or value.get("translatedText")
                or value.get("text")
                or ""
            )
            original_text = value.get("original_text") or value.get("originalText") or ""
        else:
            translated_text = str(value)
            original_text = ""

        translated_text = translated_text.strip()

        if not translated_text or translated_text.upper() == "SKIP":
            continue

        x1, y1, x2, y2 = coord_map[bubble_id]

        normalized_bubble = normalize_box([x1, y1, x2, y2], image_width, image_height)

        if normalized_bubble is None:
            continue

        x1, y1, x2, y2 = normalized_bubble

        w = max(1, x2 - x1)
        h = max(1, y2 - y1)
        ratio = w / float(h)
        area_ratio = (w * h) / float(max(1, image_width * image_height))

        if ratio >= 8 and w >= image_width * 0.65:
            continue

        if area_ratio >= 0.06:
            continue

        bubble_box = [int(x1), int(y1), int(x2), int(y2)]

        ocr_text_box = detect_text_box_with_tesseract(img, bubble_box)

        if ocr_text_box:
            text_box = ocr_text_box["box"]
            if not original_text:
                original_text = ocr_text_box.get("text", "")
        else:
            text_box = bubble_box

        tx1, ty1, tx2, ty2 = text_box

        draw = ImageDraw.Draw(image_pil)

        flat_suspicious_box = (
            ratio >= config.RASIO_BOX_GEPENG
            and w >= image_width * config.LEBAR_BOX_GEPENG_RATIO
            and h <= image_height * config.TINGGI_BOX_GEPENG_RATIO
        )

        if config.PAKAI_PATCH_UNTUK_BOX_GEPENG and flat_suspicious_box:
            tulis_teks_di_balon(
                draw,
                translated_text,
                tx1,
                ty1,
                tx2,
                ty2,
                background_patch=True,
                target_language=target_language,
            )
        else:
            margin_x = int(w * config.MASK_MARGIN_RATIO)
            margin_y = int(h * config.MASK_MARGIN_RATIO)

            overlay = Image.new("RGBA", image_pil.size, (255, 255, 255, 0))
            overlay_draw = ImageDraw.Draw(overlay)

            # Mask tetap pakai bubbleBox/candidateBox agar teks lama lebih tertutup.
            overlay_draw.rectangle(
                [
                    x1 + margin_x,
                    y1 + margin_y,
                    x2 - margin_x,
                    y2 - margin_y,
                ],
                fill=(255, 255, 255, 255),
            )

            overlay_blurred = overlay.filter(ImageFilter.GaussianBlur(radius=4))
            image_pil.paste(overlay_blurred, (0, 0), overlay_blurred)

            draw = ImageDraw.Draw(image_pil)

            # Render teks baru memakai textBox agar posisi mengikuti original text.
            tulis_teks_di_balon(
                draw,
                translated_text,
                tx1,
                ty1,
                tx2,
                ty2,
                background_patch=False,
                target_language=target_language,
            )

        region = make_region_response(
            region_id=bubble_id,
            bubble_box=bubble_box,
            text_box=[int(tx1), int(ty1), int(tx2), int(ty2)],
            image_width=image_width,
            image_height=image_height,
            translated_text=translated_text,
            original_text=original_text,
            source="hybrid_yolo_opencv_ocr_gemini",
            confidence=0.95,
        )
        region.update(
            detect_text_style(
                img,
                [int(tx1), int(ty1), int(tx2), int(ty2)],
            )
        )

        print(
            "[DEBUG] region:",
            {
                "id": region["id"],
                "x": region["x"],
                "y": region["y"],
                "width": region["width"],
                "height": region["height"],
                "bubbleBox": region["bubbleBox"],
                "textBox": region["textBox"],
                "originalText": region["originalText"],
                "translatedText": region["translatedText"],
            },
            flush=True,
        )

        bubbles.append(region)

    save_debug_text_boxes(img, bubbles, "debug_text_boxes.png")

    return image_pil, bubbles


def image_to_base64_png(image: Image.Image) -> str:
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        image.save(tmp.name)
        tmp.seek(0)
        return base64.b64encode(tmp.read()).decode("utf-8")


def png_data_url(base64_value: str | None) -> str:
    if not base64_value:
        return ""

    return f"data:image/png;base64,{base64_value}"


def build_stateless_translation_response(
    result: dict,
    target_language: str,
    context: str = "",
) -> dict:
    """Maps internal pipeline data to the public stateless editor contract."""
    text_direction = (
        "rtl"
        if target_language.lower() in RIGHT_TO_LEFT_LANGUAGES
        else "ltr"
    )
    text_items = []

    for region in result.get("regions", []):
        text_items.append(
            {
                "x": float(region.get("x", 0)),
                "y": float(region.get("y", 0)),
                "width": float(region.get("width", 0)),
                "height": float(region.get("height", 0)),
                "text": region.get("translatedText", ""),
                "originalText": region.get("originalText", ""),
                "textAlign": "center",
                "strokeColor": region.get(
                    "strokeColor",
                    DEFAULT_RESPONSE_STROKE_COLOR,
                ),
                "lineWidth": int(region.get("lineWidth", 0)),
                "fillColor": region.get(
                    "fillColor",
                    DEFAULT_RESPONSE_FILL_COLOR,
                ),
                "font": (
                    f"{DEFAULT_RESPONSE_FONT_SIZE}px "
                    f"{DEFAULT_RESPONSE_FONT_FAMILY}"
                ),
                "addFontBackground": False,
                "addFontBorder": bool(region.get("addFontBorder", False)),
                "addBackgroundColor": "#ffffff",
                "rotation": 0.0,
                "angle": 0.0,
                "layout": "h",
                "textDir": text_direction,
            }
        )

    return {
        "image": png_data_url(result.get("renderedImageBase64")),
        "inpainted": png_data_url(result.get("inpaintedImageBase64")),
        "context": context,
        "text": text_items,
    }


# ==========================================================
# MAIN PIPELINE
# ==========================================================

def translate_image_from_path(
    image_path: Path,
    target_language: str,
    source_language: str | None = None,
    provider: str = "gemini",
    render: bool = True,
    include_rendered_image: bool = True,
    source_reference: str | None = None,
):
    img = cv2.imdecode(np.fromfile(str(image_path), dtype=np.uint8), cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Image is corrupt or unreadable.")

    height, width = img.shape[:2]

    print(
        f"[DEBUG] translate source={source_reference or image_path.name}, size={width}x{height}",
        flush=True,
    )

    boxes = detect_bubble_boxes(img, str(image_path))

    print("[DEBUG] total boxes:", len(boxes), flush=True)
    print("[DEBUG] boxes:", boxes[:40], flush=True)

    mosaic, coord_map = build_cypy_mosaic(img, boxes)

    print("[DEBUG] mosaic is None:", mosaic is None, flush=True)
    print("[DEBUG] coord_map:", coord_map, flush=True)

    if mosaic is None:
        original_image = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        original_base64 = image_to_base64_png(original_image) if render else None

        return {
            "image": {
                "width": width,
                "height": height,
            },
            "bubbles": [],
            "regions": [],
            "inpaintedImageBase64": original_base64,
            "renderedImageBase64": original_base64,
            "provider": provider,
            "targetLanguage": target_language,
            "debug": {
                "reason": "NO_MOSAIC_CREATED",
                "detectedBoxes": len(boxes),
                "boxes": boxes,
                "coordMapCount": len(coord_map),
            },
        }

    llm_provider = get_llm_provider(provider)

    translations = terjemahkan_mosaik(
        mosaic,
        provider=llm_provider,
        target_language=target_language,
    )

    print("[DEBUG] translations:", translations, flush=True)

    if not translations:
        raise RuntimeError("Translation failed or provider returned empty result.")

    rendered_image, bubbles = render_translations_to_image(
        img=img,
        translations=translations,
        coord_map=coord_map,
        target_language=target_language,
    )
    inpainted_image = create_inpainted_image(img, bubbles)

    rendered_base64 = (
        image_to_base64_png(rendered_image)
        if render and include_rendered_image
        else None
    )
    inpainted_base64 = image_to_base64_png(inpainted_image) if render else None

    print("[DEBUG] final bubbles count:", len(bubbles), flush=True)

    return {
        "image": {
            "width": width,
            "height": height,
        },
        "bubbles": bubbles,
        "regions": bubbles,
        "inpaintedImageBase64": inpainted_base64,
        "renderedImageBase64": rendered_base64,
        "provider": provider,
        "targetLanguage": target_language,
    }


def translate_image_from_url(
    image_url: str,
    target_language: str,
    source_language: str | None = None,
    provider: str = "gemini",
    render: bool = True,
):
    with tempfile.TemporaryDirectory() as temp_dir:
        image_path = download_image(image_url, Path(temp_dir))
        return translate_image_from_path(
            image_path=image_path,
            target_language=target_language,
            source_language=source_language,
            provider=provider,
            render=render,
            include_rendered_image=True,
            source_reference=image_url,
        )


def translate_image_bytes(
    image_bytes: bytes,
    filename: str,
    target_language: str,
    source_language: str | None = None,
    provider: str = "gemini",
    render: bool = True,
):
    suffix = Path(filename).suffix.lower()

    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        suffix = ".png"

    with tempfile.TemporaryDirectory() as temp_dir:
        image_path = Path(temp_dir) / f"input{suffix}"
        image_path.write_bytes(image_bytes)
        return translate_image_from_path(
            image_path=image_path,
            target_language=target_language,
            source_language=source_language,
            provider=provider,
            render=render,
            include_rendered_image=True,
            source_reference=filename,
        )
