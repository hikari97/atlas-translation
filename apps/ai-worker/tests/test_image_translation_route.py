"""Route tests for stateless image-localization provider selection."""

from __future__ import annotations

import io
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient
from PIL import Image

from app.image_localization.contracts import (
    ImageLocalizationRequest,
    ImageLocalizationResult,
)
from app.main import app


def create_png() -> bytes:
    """Creates a valid upload without filesystem persistence."""
    output = io.BytesIO()
    Image.new("RGB", (16, 12), color="white").save(output, format="PNG")
    return output.getvalue()


class StubImageLocalizationProvider:
    """Captures the request routed by FastAPI and returns a stable response."""

    def __init__(self) -> None:
        self.request: ImageLocalizationRequest | None = None

    def localize(self, request: ImageLocalizationRequest) -> ImageLocalizationResult:
        self.request = request
        data_url = "data:image/png;base64,dGVzdA=="
        return ImageLocalizationResult(
            image_data_url=data_url,
            inpainted_data_url=data_url,
            context=request.context,
            text=tuple(),
        )


class ImageTranslationRouteTests(unittest.TestCase):
    """Ensures Gemini uploads use the image-localization provider registry."""

    def test_routes_gemini_upload_to_image_localization_provider(self) -> None:
        provider = StubImageLocalizationProvider()

        with patch(
            "app.main.create_image_localization_provider",
            return_value=provider,
        ) as create_provider:
            response = TestClient(app).post(
                "/v1/image/translate-upload",
                data={
                    "provider": "gemini",
                    "target_language": "id",
                    "context": "Keep names consistent",
                },
                files={"image": ("page.png", create_png(), "image/png")},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["context"], "Keep names consistent")
        create_provider.assert_called_once_with("gemini")
        self.assertIsNotNone(provider.request)
        self.assertEqual(provider.request.target_language, "id")
        self.assertEqual(provider.request.mime_type, "image/png")


if __name__ == "__main__":
    unittest.main()
