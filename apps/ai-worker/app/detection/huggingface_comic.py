"""ONNX adapter for ogkalu/comic-text-and-bubble-detector."""

from __future__ import annotations

import hashlib
import os
import threading
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol

import cv2
import numpy as np
import onnxruntime
import requests

from app.detection.contracts import (
    Detection,
    DetectionBox,
    DetectionLabel,
    TextRegionDetector,
)


DEFAULT_REPOSITORY = "ogkalu/comic-text-and-bubble-detector"
DEFAULT_REVISION = "16e8a622f91fabc6b5b65c96d32d1183f8843546"
DEFAULT_FILENAME = "detector-v4-s_int8.onnx"
DEFAULT_SHA256 = "5fe9e4f576e49d4e7e8b0e029d6d3cdc252abd4694113e1cae120e62c931ea79"
DEFAULT_CONFIDENCE = 0.3
DEFAULT_DOWNLOAD_TIMEOUT_SECONDS = 300
MODEL_INPUT_SIZE = 640
DOWNLOAD_CHUNK_BYTES = 1024 * 1024

LABEL_BY_ID = {
    0: DetectionLabel.BUBBLE,
    1: DetectionLabel.TEXT_BUBBLE,
    2: DetectionLabel.TEXT_FREE,
}


class RuntimeSession(Protocol):
    """Subset of ONNX Runtime used by the detector."""

    def run(
        self,
        output_names: list[str] | None,
        input_feed: dict[str, np.ndarray],
    ) -> list[np.ndarray]:
        """Runs one inference request."""


SessionFactory = Callable[[str], RuntimeSession]


@dataclass(frozen=True, slots=True)
class ComicDetectorConfig:
    """Runtime and download settings for the Hugging Face detector."""

    model_path: Path
    repository: str = DEFAULT_REPOSITORY
    revision: str = DEFAULT_REVISION
    filename: str = DEFAULT_FILENAME
    sha256: str = DEFAULT_SHA256
    confidence: float = DEFAULT_CONFIDENCE
    download_timeout_seconds: int = DEFAULT_DOWNLOAD_TIMEOUT_SECONDS
    enabled_labels: frozenset[DetectionLabel] = frozenset(DetectionLabel)

    @classmethod
    def from_environment(cls) -> "ComicDetectorConfig":
        """Builds detector configuration from AI-worker environment variables."""
        worker_directory = Path(__file__).resolve().parents[2]
        default_model_path = (
            worker_directory
            / "assets"
            / "models"
            / DEFAULT_REPOSITORY.replace("/", "--")
            / DEFAULT_FILENAME
        )
        configured_labels = os.getenv(
            "COMIC_DETECTOR_LABELS",
            ",".join(label.value for label in DetectionLabel),
        )
        enabled_labels = frozenset(
            DetectionLabel(value.strip().lower())
            for value in configured_labels.split(",")
            if value.strip()
        )

        if not enabled_labels:
            raise ValueError("COMIC_DETECTOR_LABELS must enable at least one label.")

        confidence = float(os.getenv("COMIC_DETECTOR_CONFIDENCE", str(DEFAULT_CONFIDENCE)))

        if not 0.0 <= confidence <= 1.0:
            raise ValueError("COMIC_DETECTOR_CONFIDENCE must be between 0 and 1.")

        return cls(
            model_path=Path(os.getenv("COMIC_DETECTOR_MODEL_PATH", default_model_path)),
            repository=os.getenv("COMIC_DETECTOR_REPOSITORY", DEFAULT_REPOSITORY),
            revision=os.getenv("COMIC_DETECTOR_REVISION", DEFAULT_REVISION),
            filename=os.getenv("COMIC_DETECTOR_FILENAME", DEFAULT_FILENAME),
            sha256=os.getenv("COMIC_DETECTOR_SHA256", DEFAULT_SHA256).lower(),
            confidence=confidence,
            download_timeout_seconds=int(
                os.getenv(
                    "COMIC_DETECTOR_DOWNLOAD_TIMEOUT_SECONDS",
                    str(DEFAULT_DOWNLOAD_TIMEOUT_SECONDS),
                )
            ),
            enabled_labels=enabled_labels,
        )

    @property
    def download_url(self) -> str:
        """Returns the model-download endpoint configured for this worker."""
        return (
            f"https://huggingface.co/{self.repository}/resolve/"
            f"{self.revision}/{self.filename}"
        )


def create_runtime_session(model_path: str) -> RuntimeSession:
    """Creates a quiet CPU ONNX Runtime session."""
    options = onnxruntime.SessionOptions()
    options.log_severity_level = 3
    return onnxruntime.InferenceSession(model_path, sess_options=options)


def calculate_sha256(file_path: Path) -> str:
    """Calculates a model file checksum without loading it entirely into memory."""
    digest = hashlib.sha256()

    with file_path.open("rb") as source:
        for chunk in iter(lambda: source.read(DOWNLOAD_CHUNK_BYTES), b""):
            digest.update(chunk)

    return digest.hexdigest()


def ensure_model_file(config: ComicDetectorConfig) -> Path:
    """Downloads and verifies the configured model when it is not cached locally."""
    if config.model_path.exists():
        actual_sha256 = calculate_sha256(config.model_path)

        if actual_sha256 != config.sha256:
            raise RuntimeError(
                f"Comic detector checksum mismatch at {config.model_path}. "
                "Remove the invalid file and retry."
            )

        return config.model_path

    config.model_path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = config.model_path.with_suffix(
        f"{config.model_path.suffix}.download.{os.getpid()}.{threading.get_ident()}"
    )
    digest = hashlib.sha256()

    try:
        with requests.get(
            config.download_url,
            stream=True,
            timeout=(15, config.download_timeout_seconds),
        ) as response:
            response.raise_for_status()

            with temporary_path.open("wb") as destination:
                for chunk in response.iter_content(chunk_size=DOWNLOAD_CHUNK_BYTES):
                    if not chunk:
                        continue

                    digest.update(chunk)
                    destination.write(chunk)

        if digest.hexdigest() != config.sha256:
            raise RuntimeError("Downloaded comic detector failed SHA-256 verification.")

        temporary_path.replace(config.model_path)
    finally:
        temporary_path.unlink(missing_ok=True)

    return config.model_path


class HuggingFaceComicDetector(TextRegionDetector):
    """Runs the quantized Hugging Face comic detector through ONNX Runtime."""

    def __init__(
        self,
        config: ComicDetectorConfig,
        session_factory: SessionFactory = create_runtime_session,
    ) -> None:
        self._config = config
        self._session_factory = session_factory
        self._session: RuntimeSession | None = None
        self._session_lock = threading.Lock()

    @classmethod
    def from_environment(cls) -> "HuggingFaceComicDetector":
        """Creates a detector using environment-backed configuration."""
        return cls(ComicDetectorConfig.from_environment())

    def _get_session(self) -> RuntimeSession:
        if self._session is not None:
            return self._session

        with self._session_lock:
            if self._session is None:
                model_path = ensure_model_file(self._config)
                self._session = self._session_factory(str(model_path))

        return self._session

    def detect(self, image: np.ndarray) -> list[Detection]:
        """Detects configured comic region classes in a BGR source image."""
        if image.ndim != 3 or image.shape[2] != 3:
            raise ValueError("Comic detector expects a three-channel BGR image.")

        image_height, image_width = image.shape[:2]
        resized = cv2.resize(
            image,
            (MODEL_INPUT_SIZE, MODEL_INPUT_SIZE),
            interpolation=cv2.INTER_LINEAR,
        )
        rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
        pixels = rgb.astype(np.float32) / 255.0
        images = np.transpose(pixels, (2, 0, 1))[np.newaxis, ...]

        # This ONNX export expects width first and returns xyxy source coordinates.
        original_sizes = np.array([[image_width, image_height]], dtype=np.int64)
        labels, boxes, scores = self._get_session().run(
            ["labels", "boxes", "scores"],
            {
                "images": images,
                "orig_target_sizes": original_sizes,
            },
        )

        detections: list[Detection] = []

        for label_id, raw_box, raw_score in zip(
            labels[0],
            boxes[0],
            scores[0],
            strict=True,
        ):
            score = float(raw_score)
            label = LABEL_BY_ID.get(int(label_id))

            if (
                score < self._config.confidence
                or label is None
                or label not in self._config.enabled_labels
            ):
                continue

            x1, y1, x2, y2 = [float(value) for value in raw_box]
            left = max(0, min(int(round(min(x1, x2))), image_width - 1))
            right = max(0, min(int(round(max(x1, x2))), image_width))
            top = max(0, min(int(round(min(y1, y2))), image_height - 1))
            bottom = max(0, min(int(round(max(y1, y2))), image_height))

            if right <= left or bottom <= top:
                continue

            detections.append(
                Detection(
                    box=DetectionBox(left, top, right, bottom),
                    label=label,
                    score=score,
                )
            )

        return detections
