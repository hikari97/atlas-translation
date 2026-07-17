from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel, HttpUrl
from app.image_localization import (
    DEFAULT_OPENROUTER_IMAGE_MODEL,
    ImageLocalizationRequest,
    create_image_localization_provider,
)
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
    model: str | None = None
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
    provider: str = Form(default="openrouter"),
    model: str = Form(default=DEFAULT_OPENROUTER_IMAGE_MODEL),
    context: str = Form(default=""),
    render: bool = Form(default=True),
):
    try:
        image_bytes = await image.read()

        if not image_bytes:
            raise ValueError("Uploaded image is empty.")

        if provider.strip().lower() == "openrouter":
            localization_provider = create_image_localization_provider(provider)
            localization_result = localization_provider.localize(
                ImageLocalizationRequest(
                    image_bytes=image_bytes,
                    mime_type=image.content_type or "image/png",
                    model=model,
                    source_language=source_language,
                    target_language=target_language,
                    context=context,
                )
            )
            return localization_result.to_public_contract()

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
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        await image.close()
