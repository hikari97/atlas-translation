"""Validation and normalization of image data returned by OpenRouter."""

from __future__ import annotations

import base64
import binascii
import io
from collections.abc import Mapping, Sequence
from dataclasses import dataclass

from PIL import Image, UnidentifiedImageError


@dataclass(frozen=True)
class ImageSize:
    """Pixel dimensions of a normalized image."""

    width: int
    height: int


@dataclass(frozen=True)
class GeneratedImage:
    """A generated image and its optional assistant text response."""

    data_url: str
    size: ImageSize
    content: str


def as_mapping(value: object, error_message: str) -> Mapping[str, object]:
    """Returns a JSON object or raises an API-contract error."""
    if not isinstance(value, Mapping):
        raise RuntimeError(error_message)

    return value


def get_source_data_url(image_bytes: bytes, mime_type: str) -> str:
    """Encodes a validated upload as the data URL accepted by OpenRouter."""
    if not image_bytes:
        raise ValueError("Uploaded image is empty.")

    normalized_mime_type = mime_type.lower().strip()
    if normalized_mime_type not in {"image/jpeg", "image/png", "image/webp"}:
        normalized_mime_type = "image/png"

    encoded_image = base64.b64encode(image_bytes).decode("ascii")
    return f"data:{normalized_mime_type};base64,{encoded_image}"


def get_image_size(image_bytes: bytes) -> ImageSize:
    """Reads image dimensions without persisting the uploaded file."""
    try:
        with Image.open(io.BytesIO(image_bytes)) as image:
            return ImageSize(width=image.width, height=image.height)
    except (UnidentifiedImageError, OSError) as exc:
        raise ValueError("Uploaded image is corrupt or unsupported.") from exc


def get_assistant_message(payload: Mapping[str, object]) -> Mapping[str, object]:
    """Extracts the first assistant message from a chat-completions response."""
    choices = payload.get("choices")
    if not isinstance(choices, Sequence) or isinstance(choices, (str, bytes)) or not choices:
        raise RuntimeError("OpenRouter response does not contain an image choice.")

    first_choice = as_mapping(choices[0], "OpenRouter image choice is invalid.")
    return as_mapping(first_choice.get("message"), "OpenRouter image message is invalid.")


def generated_image_from_chat_message(message: Mapping[str, object]) -> GeneratedImage:
    """Converts a chat-completions image result into a normalized PNG data URL."""
    images = message.get("images")
    if not isinstance(images, Sequence) or isinstance(images, (str, bytes)) or not images:
        raise RuntimeError("OpenRouter did not return a generated image.")

    first_image = as_mapping(images[0], "OpenRouter generated image is invalid.")
    image_url = first_image.get("image_url")
    data_url = ""

    if isinstance(image_url, str):
        data_url = image_url
    elif isinstance(image_url, Mapping):
        url = image_url.get("url")
        if isinstance(url, str):
            data_url = url

    if not data_url:
        raise RuntimeError("OpenRouter generated image has no data URL.")

    normalized_data_url, image_size = normalize_data_url_as_png(data_url)
    return GeneratedImage(
        data_url=normalized_data_url,
        size=image_size,
        content=extract_message_content(message.get("content")),
    )


def generated_image_from_images_response(payload: Mapping[str, object]) -> GeneratedImage:
    """Converts a dedicated Image API result into a normalized PNG data URL."""
    data = payload.get("data")
    if not isinstance(data, Sequence) or isinstance(data, (str, bytes)) or not data:
        raise RuntimeError("OpenRouter did not return a generated image.")

    first_image = as_mapping(data[0], "OpenRouter generated image is invalid.")
    encoded_image = first_image.get("b64_json")
    if not isinstance(encoded_image, str) or not encoded_image:
        raise RuntimeError("OpenRouter generated image has no base64 data.")

    normalized_data_url, image_size = normalize_image_bytes(decode_base64(encoded_image))
    return GeneratedImage(data_url=normalized_data_url, size=image_size, content="")


def extract_message_content(content: object) -> str:
    """Reads text content from either string or content-parts message formats."""
    if isinstance(content, str):
        return content

    if not isinstance(content, Sequence) or isinstance(content, (str, bytes)):
        return ""

    text_parts: list[str] = []
    for part in content:
        if not isinstance(part, Mapping):
            continue
        text = part.get("text")
        if isinstance(text, str):
            text_parts.append(text)

    return "\n".join(text_parts)


def normalize_data_url_as_png(data_url: str) -> tuple[str, ImageSize]:
    """Converts a generated image data URL to the stable PNG response format."""
    if not data_url.startswith("data:image/"):
        raise RuntimeError("OpenRouter generated an unsupported image URL.")

    _, separator, encoded_image = data_url.partition(",")
    if not separator:
        raise RuntimeError("OpenRouter generated an invalid image data URL.")

    return normalize_image_bytes(decode_base64(encoded_image))


def normalize_image_bytes(image_bytes: bytes) -> tuple[str, ImageSize]:
    """Reads an image in memory and serializes it as a PNG data URL."""
    try:
        with Image.open(io.BytesIO(image_bytes)) as image:
            normalized_image = image.convert("RGBA") if "A" in image.getbands() else image.convert("RGB")
            image_size = ImageSize(width=normalized_image.width, height=normalized_image.height)
            output = io.BytesIO()
            normalized_image.save(output, format="PNG")
    except (UnidentifiedImageError, OSError) as exc:
        raise RuntimeError("OpenRouter returned an unreadable generated image.") from exc

    encoded_image = base64.b64encode(output.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded_image}", image_size


def decode_base64(encoded_image: str) -> bytes:
    """Decodes an OpenRouter image payload with strict base64 validation."""
    try:
        return base64.b64decode(encoded_image, validate=True)
    except (ValueError, binascii.Error) as exc:
        raise RuntimeError("OpenRouter returned invalid image base64 data.") from exc
