"""Base interface for stateless image-localization providers."""

from __future__ import annotations

from abc import ABC, abstractmethod

from app.image_localization.contracts import (
    ImageLocalizationRequest,
    ImageLocalizationResult,
)


class ImageLocalizationProvider(ABC):
    """Generates translated and clean images without persisting either result."""

    @abstractmethod
    def localize(self, request: ImageLocalizationRequest) -> ImageLocalizationResult:
        """Localizes one source image and returns an editor-ready response."""
