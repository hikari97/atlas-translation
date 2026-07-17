"""OpenRouter implementation for stateless comic image localization."""

from __future__ import annotations

import os
from collections.abc import Mapping
from concurrent.futures import ThreadPoolExecutor

import requests

from app.image_localization.contracts import (
    ImageLocalizationRequest,
    ImageLocalizationResult,
)
from app.image_localization.image_response import (
    GeneratedImage,
    as_mapping,
    generated_image_from_chat_message,
    generated_image_from_images_response,
    get_assistant_message,
    get_image_size,
    get_source_data_url,
)
from app.image_localization.models import OpenRouterImageModel, get_openrouter_image_model
from app.image_localization.provider import ImageLocalizationProvider
from app.image_localization.text_metadata import (
    build_inpainting_prompt,
    build_translation_prompt,
    parse_text_metadata,
)


OPENROUTER_CHAT_COMPLETIONS_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_IMAGES_URL = "https://openrouter.ai/api/v1/images"
DEFAULT_TIMEOUT_SECONDS = 240
MAX_PARALLEL_GENERATIONS = 2
MAX_ERROR_RESPONSE_LENGTH = 800


class OpenRouterImageLocalizationProvider(ImageLocalizationProvider):
    """Uses one selected OpenRouter image model for translated and clean renders."""

    def __init__(
        self,
        api_key: str,
        timeout_seconds: int,
        app_url: str | None = None,
        app_title: str | None = None,
    ) -> None:
        if not api_key:
            raise ValueError("OPENROUTER_API_KEY is not configured.")

        self._api_key = api_key
        self._timeout_seconds = timeout_seconds
        self._app_url = app_url
        self._app_title = app_title

    @classmethod
    def from_environment(cls) -> "OpenRouterImageLocalizationProvider":
        """Builds the provider from environment variables without exposing secrets."""
        return cls(
            api_key=os.getenv("OPENROUTER_API_KEY", ""),
            timeout_seconds=get_positive_integer(
                os.getenv("OPENROUTER_IMAGE_TIMEOUT_SECONDS"),
                DEFAULT_TIMEOUT_SECONDS,
            ),
            app_url=os.getenv("OPENROUTER_APP_URL"),
            app_title=os.getenv("OPENROUTER_APP_TITLE", "Atlas Studio"),
        )

    def localize(self, request: ImageLocalizationRequest) -> ImageLocalizationResult:
        """Generates translated and text-free images in parallel for one upload."""
        model = get_openrouter_image_model(request.model)
        source_data_url = get_source_data_url(request.image_bytes, request.mime_type)
        source_size = get_image_size(request.image_bytes)

        with ThreadPoolExecutor(max_workers=MAX_PARALLEL_GENERATIONS) as executor:
            translated_future = executor.submit(
                self.generate_translated_image,
                model,
                request,
                source_data_url,
            )
            inpainted_future = executor.submit(
                self.generate_inpainted_image,
                model,
                request,
                source_data_url,
            )
            translated_image = translated_future.result()
            inpainted_image = inpainted_future.result()

        response_context, text_regions = (
            parse_text_metadata(
                content=translated_image.content,
                source_size=source_size,
                output_size=inpainted_image.size,
                target_language=request.target_language,
            )
            if model.supports_text_metadata
            else ("", tuple())
        )

        return ImageLocalizationResult(
            image_data_url=translated_image.data_url,
            inpainted_data_url=inpainted_image.data_url,
            context=response_context or request.context,
            text=text_regions,
        )

    def generate_translated_image(
        self,
        model: OpenRouterImageModel,
        request: ImageLocalizationRequest,
        source_data_url: str,
    ) -> GeneratedImage:
        """Requests a model render where every readable text region is translated."""
        return self.generate_image(
            model=model,
            prompt=build_translation_prompt(request, model.supports_text_metadata),
            source_data_url=source_data_url,
        )

    def generate_inpainted_image(
        self,
        model: OpenRouterImageModel,
        request: ImageLocalizationRequest,
        source_data_url: str,
    ) -> GeneratedImage:
        """Requests a clean model render with every text mark removed."""
        return self.generate_image(
            model=model,
            prompt=build_inpainting_prompt(request),
            source_data_url=source_data_url,
        )

    def generate_image(
        self,
        model: OpenRouterImageModel,
        prompt: str,
        source_data_url: str,
    ) -> GeneratedImage:
        """Routes image generation through the API shape supported by the model."""
        if model.uses_dedicated_image_api:
            return self.generate_with_image_api(model, prompt, source_data_url)

        return self.generate_with_chat_api(model, prompt, source_data_url)

    def generate_with_chat_api(
        self,
        model: OpenRouterImageModel,
        prompt: str,
        source_data_url: str,
    ) -> GeneratedImage:
        """Generates an image plus structured text through chat completions."""
        payload = {
            "model": model.identifier,
            "modalities": ["image", "text"],
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": source_data_url}},
                    ],
                },
            ],
        }
        message = get_assistant_message(
            self.post_json(OPENROUTER_CHAT_COMPLETIONS_URL, payload)
        )
        return generated_image_from_chat_message(message)

    def generate_with_image_api(
        self,
        model: OpenRouterImageModel,
        prompt: str,
        source_data_url: str,
    ) -> GeneratedImage:
        """Generates an image through OpenRouter's dedicated Image API."""
        payload = {
            "model": model.identifier,
            "prompt": prompt,
            "input_references": [
                {
                    "type": "image_url",
                    "image_url": {"url": source_data_url},
                },
            ],
            "aspect_ratio": "auto",
            "n": 1,
        }
        response_payload = self.post_json(OPENROUTER_IMAGES_URL, payload)
        return generated_image_from_images_response(response_payload)

    def post_json(self, url: str, payload: Mapping[str, object]) -> Mapping[str, object]:
        """Posts a JSON request with OpenRouter authentication and response validation."""
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }
        if self._app_url:
            headers["HTTP-Referer"] = self._app_url
        if self._app_title:
            headers["X-Title"] = self._app_title

        response = requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=self._timeout_seconds,
        )
        if not response.ok:
            detail = response.text[:MAX_ERROR_RESPONSE_LENGTH]
            raise RuntimeError(
                f"OpenRouter image request failed ({response.status_code}): {detail}"
            )

        payload_object: object = response.json()
        return as_mapping(payload_object, "OpenRouter returned an invalid JSON response.")


def get_positive_integer(value: str | None, fallback: int) -> int:
    """Parses a positive environment integer with a safe default."""
    if not value:
        return fallback

    try:
        parsed = int(value)
    except ValueError:
        return fallback

    return parsed if parsed > 0 else fallback
