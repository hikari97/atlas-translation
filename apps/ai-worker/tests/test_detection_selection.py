"""Tests for mapping classified model detections into translation regions."""

from __future__ import annotations

import unittest

from app.detection import Detection, DetectionBox, DetectionLabel
from app.pipeline.image_translation import select_model_detection_boxes


class DetectionSelectionTests(unittest.TestCase):
    """Verifies text/bubble pairing before OCR fallback processing."""

    def test_pairs_bubble_text_and_keeps_free_text(self) -> None:
        detections = [
            Detection(DetectionBox(10, 10, 100, 120), DetectionLabel.BUBBLE, 0.95),
            Detection(DetectionBox(30, 30, 70, 90), DetectionLabel.TEXT_BUBBLE, 0.9),
            Detection(DetectionBox(150, 20, 190, 80), DetectionLabel.TEXT_FREE, 0.85),
        ]

        trusted, fallback = select_model_detection_boxes(detections, 200, 160)

        self.assertEqual(trusted, [[150, 20, 190, 80], [10, 10, 100, 120]])
        self.assertEqual(fallback, [])

    def test_routes_unmatched_bubble_to_ocr_fallback(self) -> None:
        detections = [
            Detection(DetectionBox(10, 10, 100, 120), DetectionLabel.BUBBLE, 0.95),
        ]

        trusted, fallback = select_model_detection_boxes(detections, 200, 160)

        self.assertEqual(trusted, [])
        self.assertEqual(fallback, [[10, 10, 100, 120]])


if __name__ == "__main__":
    unittest.main()
