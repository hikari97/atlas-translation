"""Contracts shared by comic text-region detectors."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import StrEnum

import numpy as np


class DetectionLabel(StrEnum):
    """Stable labels exposed by comic detection providers."""

    BUBBLE = "bubble"
    TEXT_BUBBLE = "text_bubble"
    TEXT_FREE = "text_free"


@dataclass(frozen=True, slots=True)
class DetectionBox:
    """A detected rectangle in source-image pixel coordinates."""

    x1: int
    y1: int
    x2: int
    y2: int

    def to_xyxy(self) -> list[int]:
        """Returns coordinates in the pipeline's `[x1, y1, x2, y2]` format."""
        return [self.x1, self.y1, self.x2, self.y2]


@dataclass(frozen=True, slots=True)
class Detection:
    """One classified text or speech-bubble detection."""

    box: DetectionBox
    label: DetectionLabel
    score: float


class TextRegionDetector(ABC):
    """Provider interface for local comic text-region detection."""

    @abstractmethod
    def detect(self, image: np.ndarray) -> list[Detection]:
        """Detects text and speech-bubble regions in a BGR image."""

