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

module.exports = {
  translatePageImage,
};
