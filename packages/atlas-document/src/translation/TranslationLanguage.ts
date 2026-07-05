import type { LanguageDirection } from '@atlas/atlas-types';

/**
 * Source and target language metadata.
 */
export interface TranslationLanguage {
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly direction: LanguageDirection;
}
