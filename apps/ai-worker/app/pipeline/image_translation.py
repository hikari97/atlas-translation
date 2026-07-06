import tempfile
from pathlib import Path

import requests


def download_image(image_url: str, workdir: Path) -> Path:
    response = requests.get(image_url, timeout=60)
    response.raise_for_status()

    image_path = workdir / "input.png"
    image_path.write_bytes(response.content)
    return image_path


def translate_image_from_url(
    image_url: str,
    target_language: str,
    source_language: str | None = None,
    provider: str = "gemini",
    render: bool = False,
):
    with tempfile.TemporaryDirectory() as temp_dir:
        workdir = Path(temp_dir)
        image_path = download_image(image_url, workdir)

        # TODO:
        # 1. panggil YOLO dari cypy_engine/yolo_onnx.py
        # 2. crop bubble
        # 3. buat mosaic bernomor
        # 4. kirim ke provider vision LLM
        # 5. parse JSON hasil translasi
        # 6. return bubble boxes + translated text
        #
        # Tahap awal boleh return metadata dulu agar API pipeline tersambung.

        return {
            "image": {
                "sourceUrl": image_url,
                "width": None,
                "height": None,
            },
            "bubbles": [],
            "renderedImageBase64": None,
            "provider": provider,
            "targetLanguage": target_language,
        }