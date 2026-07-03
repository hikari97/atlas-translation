import type { Nullable } from '../common';
import type { LanguageDirection } from '../enums';

/**
 * Source and target text content for a translation.
 */
export interface TranslationContent {
  readonly sourceText: string;
  readonly translatedText: Nullable<string>;
  readonly reviewedText: Nullable<string>;
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly languageDirection: LanguageDirection;
}
