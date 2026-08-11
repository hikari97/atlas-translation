# Comic Text and Bubble Detection

> Status: Stable

Atlas Studio detects candidate translation regions through a provider interface.
The pipeline must not import or decode vendor-specific models directly.

## Default Provider

The default `huggingface_comic` provider runs
`ogkalu/comic-text-and-bubble-detector` locally with ONNX Runtime.

- Architecture: RT-DETR-v2
- Input: RGB float tensor resized to 640 × 640
- Classes: `bubble`, `text_bubble`, and `text_free`
- Artifact: quantized `detector-v4-s_int8.onnx`
- Model revision and SHA-256 are pinned in worker configuration

The model is downloaded only on the first detection, verified, and cached under
`apps/ai-worker/assets/models/`. Model artifacts are not committed to Git.

## Provider Flow

```text
Image pipeline
      ↓
TextRegionDetector
      ↓
Detector registry
      ↓
HuggingFaceComicDetector
      ↓
ONNX Runtime
```

Matched model text regions are trusted and passed directly to translation and
inpainting. Unmatched bubbles pass through OCR validation. The former OpenCV,
direct-OCR, and Gemini detection path is disabled by default and is used only
when the model finds no trusted text or `ENABLE_LEGACY_DETECTION_FALLBACK=true`.

## Configuration

```env
DETECTION_PROVIDER=huggingface_comic
COMIC_DETECTOR_CONFIDENCE=0.3
COMIC_DETECTOR_LABELS=bubble,text_bubble,text_free
ENABLE_LEGACY_DETECTION_FALLBACK=false
```

See `apps/ai-worker/.env.example` for repository, revision, checksum, timeout,
and optional local model-path settings.

New detectors must implement `TextRegionDetector` and register a factory in the
detector registry.
