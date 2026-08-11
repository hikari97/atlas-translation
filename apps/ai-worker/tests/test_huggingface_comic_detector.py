"""Unit tests for the Hugging Face comic detector adapter."""

from __future__ import annotations

import hashlib
import tempfile
import unittest
from pathlib import Path

import numpy as np

from app.detection.contracts import DetectionLabel
from app.detection.huggingface_comic import (
    ComicDetectorConfig,
    HuggingFaceComicDetector,
    RuntimeSession,
)


class FakeRuntimeSession(RuntimeSession):
    """Deterministic ONNX session used to inspect preprocessing and decoding."""

    def __init__(self) -> None:
        self.input_feed: dict[str, np.ndarray] | None = None

    def run(
        self,
        output_names: list[str] | None,
        input_feed: dict[str, np.ndarray],
    ) -> list[np.ndarray]:
        self.input_feed = input_feed
        self.output_names = output_names
        return [
            np.array([[0, 1, 2]], dtype=np.int64),
            np.array(
                [[[-8.0, 10.0, 120.0, 70.0], [5.0, 6.0, 20.0, 30.0], [1.0, 2.0, 3.0, 4.0]]],
                dtype=np.float32,
            ),
            np.array([[0.95, 0.8, 0.1]], dtype=np.float32),
        ]


class HuggingFaceComicDetectorTests(unittest.TestCase):
    """Covers the model's exported tensor contract without network access."""

    def test_preprocesses_and_decodes_detections(self) -> None:
        model_bytes = b"fake-onnx-model"

        with tempfile.TemporaryDirectory() as temporary_directory:
            model_path = Path(temporary_directory) / "detector.onnx"
            model_path.write_bytes(model_bytes)
            session = FakeRuntimeSession()
            detector = HuggingFaceComicDetector(
                ComicDetectorConfig(
                    model_path=model_path,
                    sha256=hashlib.sha256(model_bytes).hexdigest(),
                    confidence=0.3,
                ),
                session_factory=lambda _: session,
            )

            image = np.zeros((80, 100, 3), dtype=np.uint8)
            detections = detector.detect(image)

        self.assertEqual([item.label for item in detections], [
            DetectionLabel.BUBBLE,
            DetectionLabel.TEXT_BUBBLE,
        ])
        self.assertEqual(detections[0].box.to_xyxy(), [0, 10, 100, 70])
        self.assertEqual(detections[1].box.to_xyxy(), [5, 6, 20, 30])
        self.assertIsNotNone(session.input_feed)
        self.assertEqual(session.output_names, ["labels", "boxes", "scores"])
        self.assertEqual(session.input_feed["images"].shape, (1, 3, 640, 640))
        np.testing.assert_array_equal(
            session.input_feed["orig_target_sizes"],
            np.array([[100, 80]], dtype=np.int64),
        )

    def test_filters_disabled_labels(self) -> None:
        model_bytes = b"fake-onnx-model"

        with tempfile.TemporaryDirectory() as temporary_directory:
            model_path = Path(temporary_directory) / "detector.onnx"
            model_path.write_bytes(model_bytes)
            detector = HuggingFaceComicDetector(
                ComicDetectorConfig(
                    model_path=model_path,
                    sha256=hashlib.sha256(model_bytes).hexdigest(),
                    enabled_labels=frozenset({DetectionLabel.TEXT_BUBBLE}),
                ),
                session_factory=lambda _: FakeRuntimeSession(),
            )

            detections = detector.detect(np.zeros((80, 100, 3), dtype=np.uint8))

        self.assertEqual(len(detections), 1)
        self.assertEqual(detections[0].label, DetectionLabel.TEXT_BUBBLE)


if __name__ == "__main__":
    unittest.main()
