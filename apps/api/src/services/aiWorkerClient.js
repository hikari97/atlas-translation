const AI_WORKER_URL = process.env.AI_WORKER_URL || 'http://localhost:8000';
const API_PUBLIC_URL = process.env.API_PUBLIC_URL || 'http://localhost:3001';

function buildPublicImageUrl(imagePath) {
  if (!imagePath) {
    throw new Error('Page image is empty.');
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith('/')
    ? imagePath
    : `/${imagePath}`;
  return `${API_PUBLIC_URL}${normalizedPath}`;
}

async function translatePageImage({
  page,
  targetLanguage = 'id',
  provider = 'gemini',
}) {
  const imageUrl = buildPublicImageUrl(page.image);

  const response = await fetch(`${AI_WORKER_URL}/v1/image/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl,
      targetLanguage,
      provider,
      render: false,
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    throw new Error(
      payload?.detail || payload?.message || 'AI worker translation failed.',
    );
  }

  return payload;
}

async function translateImageBuffer({
  buffer,
  context,
  filename,
  mimeType,
  provider,
  sourceLanguage,
  targetLanguage,
}) {
  const formData = new FormData();
  formData.append('image', new Blob([buffer], { type: mimeType }), filename);
  formData.append('provider', provider);
  formData.append('target_language', targetLanguage);
  formData.append('render', 'true');

  if (context) {
    formData.append('context', context);
  }

  if (sourceLanguage) {
    formData.append('source_language', sourceLanguage);
  }

  const response = await fetch(`${AI_WORKER_URL}/v1/image/translate-upload`, {
    method: 'POST',
    body: formData,
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok || !isStatelessTranslationPayload(payload)) {
    throw new Error(
      payload?.detail || payload?.message || 'AI worker translation failed.',
    );
  }

  return payload;
}

function isStatelessTranslationPayload(payload) {
  return Boolean(
    payload
    && typeof payload.image === 'string'
    && typeof payload.inpainted === 'string'
    && typeof payload.context === 'string'
    && Array.isArray(payload.text),
  );
}

module.exports = {
  translateImageBuffer,
  translatePageImage,
};
