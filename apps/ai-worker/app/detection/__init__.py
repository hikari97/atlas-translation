"""Extensible text-region detection providers."""

from app.detection.contracts import Detection, DetectionBox, DetectionLabel
from app.detection.registry import get_text_region_detector

__all__ = [
    "Detection",
    "DetectionBox",
    "DetectionLabel",
    "get_text_region_detector",
]
