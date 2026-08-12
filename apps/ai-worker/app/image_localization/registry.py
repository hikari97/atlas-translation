"""Provider registry for stateless image localization."""

from __future__ import annotations

from collections.abc import Callable

from app.image_localization.gemini import GeminiImageLocalizationProvider
from app.image_localization.openrouter import OpenRouterImageLocalizationProvider
from app.image_localization.provider import ImageLocalizationProvider


ProviderFactory = Callable[[], ImageLocalizationProvider]


def create_gemini_provider() -> ImageLocalizationProvider:
    """Creates the direct Gemini provider using the worker environment."""
    return GeminiImageLocalizationProvider.from_environment()


def create_openrouter_provider() -> ImageLocalizationProvider:
    """Creates the OpenRouter provider using the worker environment."""
    return OpenRouterImageLocalizationProvider.from_environment()


IMAGE_LOCALIZATION_PROVIDERS: dict[str, ProviderFactory] = {
    "gemini": create_gemini_provider,
    "openrouter": create_openrouter_provider,
}


def create_image_localization_provider(provider_name: str) -> ImageLocalizationProvider:
    """Creates a registered provider by its stable public name."""
    provider_factory = IMAGE_LOCALIZATION_PROVIDERS.get(provider_name.strip().lower())

    if provider_factory is None:
        raise ValueError("The selected image-localization provider is not supported.")

    return provider_factory()
