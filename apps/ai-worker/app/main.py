from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel, HttpUrl
from app.pipeline.image_translation import (
    build_stateless_translation_response,
    translate_image_bytes,
    translate_image_from_url,
)

app = FastAPI(title="Atlas AI Worker", version="0.1.0")


class ImageTranslationRequest(BaseModel):
    imageUrl: HttpUrl
    sourceLanguage: str | None = None
    targetLanguage: str = "id"
    provider: str = "gemini"
    render: bool = False


@app.get("/health")
def health():
    return {"success": True, "service": "atlas-ai-worker"}


@app.post("/v1/image/translate")
def translate_image(payload: ImageTranslationRequest):
    try:
        result = translate_image_from_url(
            image_url=str(payload.imageUrl),
            target_language=payload.targetLanguage,
            source_language=payload.sourceLanguage,
            provider=payload.provider,
            render=payload.render,
        )
        return {"success": True, **result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/v1/image/translate-upload")
async def translate_uploaded_image(
    image: UploadFile = File(...),
    source_language: str | None = Form(default=None),
    target_language: str = Form(default="id"),
    provider: str = Form(default="gemini"),
    context: str = Form(default=""),
    render: bool = Form(default=True),
):
    try:
        image_bytes = await image.read()

        if not image_bytes:
            raise ValueError("Uploaded image is empty.")

        result = translate_image_bytes(
            image_bytes=image_bytes,
            filename=image.filename or "image.png",
            target_language=target_language,
            source_language=source_language,
            provider=provider,
            render=render,
        )
        return build_stateless_translation_response(
            result=result,
            target_language=target_language,
            context=context,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        await image.close()
