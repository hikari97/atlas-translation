import type { Nullable } from '../common';
import type { LanguageDirection } from '../enums';

/**
 * Editable text content associated with a bubble.
 */
export interface BubbleContent {
  readonly sourceText: Nullable<string>;
  readonly correctedSourceText: Nullable<string>;
  readonly translatedText: Nullable<string>;
  readonly notes: Nullable<string>;
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly languageDirection: LanguageDirection;
}
