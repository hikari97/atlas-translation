export interface ImageLocalizationModel {
  readonly id: string;
  readonly label: string;
}

export const IMAGE_LOCALIZATION_MODELS = [
  {
    id: 'google/gemini-3.1-flash-lite-image',
    label: 'Google: Gemini 3.1 Flash Lite Image',
  },
  {
    id: 'openai/gpt-5-image',
    label: 'OpenAI: GPT-5 Image',
  },
  {
    id: 'x-ai/grok-imagine-image-quality',
    label: 'xAI: Grok Imagine Image Quality',
  },
] as const satisfies readonly ImageLocalizationModel[];

export type ImageLocalizationModelId = (typeof IMAGE_LOCALIZATION_MODELS)[number]['id'];

export const DEFAULT_IMAGE_LOCALIZATION_MODEL: ImageLocalizationModelId =
  'google/gemini-3.1-flash-lite-image';

export function isImageLocalizationModelId(value: string): value is ImageLocalizationModelId {
  return IMAGE_LOCALIZATION_MODELS.some((model) => model.id === value);
}
