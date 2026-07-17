"""Resolution rules for direct, non-OpenRouter image-localization providers."""

from __future__ import annotations

import os

from cypy.core import config


GEMINI_PROVIDER_NAME = "gemini"


def resolve_direct_provider(provider_name: str) -> str:
    """Validates the configured provider used by the direct Gemini editor option."""
    normalized_provider = provider_name.strip().lower()
    if normalized_provider != GEMINI_PROVIDER_NAME:
        return normalized_provider

    configured_provider = os.getenv("LLM_PROVIDER", config.LLM_PROVIDER).strip().lower()
    if configured_provider != GEMINI_PROVIDER_NAME:
        raise ValueError(
            "The direct Gemini option requires LLM_PROVIDER=gemini in the AI worker environment."
        )

    return configured_provider
