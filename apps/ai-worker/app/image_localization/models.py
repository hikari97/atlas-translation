"""The reviewed OpenRouter image models exposed by Atlas Studio."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class OpenRouterImageModel:
    """Capabilities required to invoke an OpenRouter image model safely."""

    identifier: str
    label: str
    uses_dedicated_image_api: bool
    supports_text_metadata: bool


GEMINI_FLASH_LITE_IMAGE = "google/gemini-3.1-flash-lite-image"
GPT_5_IMAGE = "openai/gpt-5-image"
GROK_IMAGINE_IMAGE_QUALITY = "x-ai/grok-imagine-image-quality"

DEFAULT_OPENROUTER_IMAGE_MODEL = GEMINI_FLASH_LITE_IMAGE

OPENROUTER_IMAGE_MODELS: tuple[OpenRouterImageModel, ...] = (
    OpenRouterImageModel(
        identifier=GEMINI_FLASH_LITE_IMAGE,
        label="Google: Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image)",
        uses_dedicated_image_api=False,
        supports_text_metadata=True,
    ),
    OpenRouterImageModel(
        identifier=GPT_5_IMAGE,
        label="OpenAI: GPT-5 Image",
        uses_dedicated_image_api=False,
        supports_text_metadata=True,
    ),
    OpenRouterImageModel(
        identifier=GROK_IMAGINE_IMAGE_QUALITY,
        label="xAI: Grok Imagine Image Quality",
        uses_dedicated_image_api=True,
        supports_text_metadata=False,
    ),
)


def get_openrouter_image_model(identifier: str) -> OpenRouterImageModel:
    """Returns a configured image model or rejects an unreviewed model id."""
    normalized_identifier = identifier.strip()

    for model in OPENROUTER_IMAGE_MODELS:
        if model.identifier == normalized_identifier:
            return model

    raise ValueError("The selected OpenRouter image model is not supported.")
