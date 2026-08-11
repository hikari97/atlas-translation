"""Registry for pluggable comic text-region detectors."""

from __future__ import annotations

import os
from collections.abc import Callable
from functools import lru_cache

from app.detection.contracts import TextRegionDetector
from app.detection.huggingface_comic import HuggingFaceComicDetector


DetectorFactory = Callable[[], TextRegionDetector]
DEFAULT_DETECTOR_PROVIDER = "huggingface_comic"


DETECTOR_PROVIDERS: dict[str, DetectorFactory] = {
    "huggingface_comic": HuggingFaceComicDetector.from_environment,
}


@lru_cache(maxsize=1)
def get_text_region_detector(provider_name: str | None = None) -> TextRegionDetector:
    """Returns the configured detector provider as a process-wide singleton."""
    normalized_name = (
        provider_name
        or os.getenv("DETECTION_PROVIDER")
        or DEFAULT_DETECTOR_PROVIDER
    ).strip().lower()
    provider_factory = DETECTOR_PROVIDERS.get(normalized_name)

    if provider_factory is None:
        supported = ", ".join(sorted(DETECTOR_PROVIDERS))
        raise ValueError(
            f"Unsupported detection provider '{normalized_name}'. Supported: {supported}."
        )

    return provider_factory()
