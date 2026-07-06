from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from app.pipeline.image_translation import translate_image_from_url

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