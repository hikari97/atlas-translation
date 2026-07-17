export type ImageLocalizationProvider = 'gemini' | 'openrouter';

export interface ImageLocalizationModel {
  readonly id: string;
  readonly label: string;
  readonly provider: ImageLocalizationProvider;
}

export const IMAGE_LOCALIZATION_MODELS = [
  {
    id: 'gemini',
    label: 'Google Gemini (MODEL_GEMINI)',
    provider: 'gemini',
  },
  {
    id: 'openai/gpt-5-image',
    label: 'OpenAI: GPT-5 Image',
    provider: 'openrouter',
  },
  {
    id: 'x-ai/grok-imagine-image-quality',
    label: 'xAI: Grok Imagine Image Quality',
    provider: 'openrouter',
  },
] as const satisfies readonly ImageLocalizationModel[];

export type ImageLocalizationModelId = (typeof IMAGE_LOCALIZATION_MODELS)[number]['id'];

export const DEFAULT_IMAGE_LOCALIZATION_MODEL: ImageLocalizationModelId =
  'gemini';

export function isImageLocalizationModelId(value: string): value is ImageLocalizationModelId {
  return IMAGE_LOCALIZATION_MODELS.some((model) => model.id === value);
}

export function getImageLocalizationModel(
  id: ImageLocalizationModelId,
): (typeof IMAGE_LOCALIZATION_MODELS)[number] {
  const model = IMAGE_LOCALIZATION_MODELS.find((item) => item.id === id);

  if (!model) {
    throw new Error('The selected image-localization model is unavailable.');
  }

  return model;
}
