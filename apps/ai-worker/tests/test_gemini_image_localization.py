"""Unit tests for direct Gemini image localization."""

from __future__ import annotations

import io
import json
import threading
import unittest
from types import SimpleNamespace

from PIL import Image

from app.image_localization.contracts import ImageLocalizationRequest
from app.image_localization.gemini import (
    GeminiImageLocalizationProvider,
    generated_image_from_gemini_response,
)
from app.image_localization.image_response import GeneratedImage, normalize_image_bytes


def create_png(width: int, height: int) -> bytes:
    """Creates a small in-memory test image."""
    output = io.BytesIO()
    Image.new("RGB", (width, height), color="white").save(output, format="PNG")
    return output.getvalue()


class FakeGeminiImageGenerator:
    """Returns deterministic translated and clean images for provider tests."""

    def __init__(self) -> None:
        self.calls: list[tuple[str, str, str]] = []
        self._lock = threading.Lock()

    def generate(
        self,
        model: str,
        image_bytes: bytes,
        mime_type: str,
        prompt: str,
    ) -> GeneratedImage:
        with self._lock:
            self.calls.append((model, mime_type, prompt))

        data_url, size = normalize_image_bytes(create_png(200, 160))
        content = ""
        if "Translate every readable" in prompt:
            content = json.dumps(
                {
                    "context": "Translated with Gemini",
                    "text": [
                        {
                            "x": 0.1,
                            "y": 0.2,
                            "width": 0.3,
                            "height": 0.4,
                            "text": "Halo",
                            "originalText": "Hello",
                            "fillColor": "#111111",
                            "strokeColor": "#ffffff",
                            "lineWidth": 2,
                        }
                    ],
                }
            )

        return GeneratedImage(data_url=data_url, size=size, content=content)


class GeminiImageLocalizationTests(unittest.TestCase):
    """Covers Gemini routing, response parsing, and the public provider result."""

    def test_localizes_translated_and_inpainted_images(self) -> None:
        generator = FakeGeminiImageGenerator()
        provider = GeminiImageLocalizationProvider(
            api_key="test-key",
            model="gemini-3.1-flash-lite-image",
            timeout_seconds=240,
            generator=generator,
        )

        result = provider.localize(
            ImageLocalizationRequest(
                image_bytes=create_png(100, 80),
                mime_type="image/png",
                model="gemini",
                source_language="en",
                target_language="id",
                context="",
            )
        )

        self.assertTrue(result.image_data_url.startswith("data:image/png;base64,"))
        self.assertTrue(result.inpainted_data_url.startswith("data:image/png;base64,"))
        self.assertEqual(result.context, "Translated with Gemini")
        self.assertEqual(len(result.text), 1)
        self.assertEqual(result.text[0].text, "Halo")
        self.assertEqual(result.text[0].x, 20.0)
        self.assertEqual(result.text[0].height, 64.0)
        self.assertEqual(len(generator.calls), 2)
        self.assertTrue(all(call[0] == "gemini-3.1-flash-lite-image" for call in generator.calls))

    def test_extracts_image_and_text_parts_from_sdk_response(self) -> None:
        response = SimpleNamespace(
            parts=[
                SimpleNamespace(text='{"context":"ok","text":[]}', inline_data=None),
                SimpleNamespace(
                    text=None,
                    inline_data=SimpleNamespace(data=create_png(32, 24)),
                ),
            ]
        )

        generated = generated_image_from_gemini_response(response)

        self.assertEqual(generated.size.width, 32)
        self.assertEqual(generated.size.height, 24)
        self.assertEqual(generated.content, '{"context":"ok","text":[]}')

    def test_reports_finish_reason_when_response_has_no_image(self) -> None:
        response = SimpleNamespace(
            parts=[SimpleNamespace(text="No image", inline_data=None)],
            candidates=[
                SimpleNamespace(
                    finish_reason=SimpleNamespace(name="SAFETY"),
                )
            ],
        )

        with self.assertRaisesRegex(RuntimeError, "Finish reason: SAFETY"):
            generated_image_from_gemini_response(response)


if __name__ == "__main__":
    unittest.main()
