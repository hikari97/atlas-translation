"""Extensible image-localization provider package."""

from app.image_localization.contracts import (
    ImageLocalizationRequest,
    ImageLocalizationResult,
    LocalizedText,
)
from app.image_localization.models import DEFAULT_OPENROUTER_IMAGE_MODEL
from app.image_localization.registry import create_image_localization_provider

__all__ = (
    "DEFAULT_OPENROUTER_IMAGE_MODEL",
    "ImageLocalizationRequest",
    "ImageLocalizationResult",
    "LocalizedText",
    "create_image_localization_provider",
)
