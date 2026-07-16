const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface StatelessTextResult {
  readonly addBackgroundColor: string;
  readonly addFontBackground: boolean;
  readonly addFontBorder: boolean;
  readonly angle: number;
  readonly fillColor: string;
  readonly font: string;
  readonly height: number;
  readonly layout: string;
  readonly lineWidth: number;
  readonly originalText: string;
  readonly rotation: number;
  readonly strokeColor: string;
  readonly text: string;
  readonly textAlign: 'left' | 'center' | 'right';
  readonly textDir: 'ltr' | 'rtl';
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

export interface StatelessTranslationResult {
  readonly context: string;
  readonly image: string;
  readonly inpainted: string;
  readonly text: readonly StatelessTextResult[];
}

interface TranslateImageInput {
  readonly file: File;
  readonly context?: string;
  readonly provider: string;
  readonly sourceLanguage?: string;
  readonly targetLanguage: string;
}

function getToken(): string {
  return localStorage.getItem('token') || '';
}

/** Sends an image for one-off translation without creating persistent records. */
export async function translateImageStateless({
  file,
  context,
  provider,
  sourceLanguage,
  targetLanguage,
}: TranslateImageInput): Promise<StatelessTranslationResult> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('provider', provider);
  formData.append('targetLanguage', targetLanguage);

  if (context) {
    formData.append('context', context);
  }

  if (sourceLanguage) {
    formData.append('sourceLanguage', sourceLanguage);
  }

  const response = await fetch(`${API_URL}/translation/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok || !isTranslationResult(payload)) {
    const message = getErrorMessage(payload);
    throw new Error(message || 'Image translation failed.');
  }

  return payload;
}

function isTranslationResult(value: unknown): value is StatelessTranslationResult {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<StatelessTranslationResult>;
  return typeof candidate.image === 'string'
    && candidate.image.startsWith('data:image/png;base64,')
    && typeof candidate.inpainted === 'string'
    && candidate.inpainted.startsWith('data:image/png;base64,')
    && typeof candidate.context === 'string'
    && Array.isArray(candidate.text);
}

function getErrorMessage(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const candidate = value as { readonly detail?: unknown; readonly message?: unknown };

  if (typeof candidate.detail === 'string') {
    return candidate.detail;
  }

  return typeof candidate.message === 'string' ? candidate.message : undefined;
}
