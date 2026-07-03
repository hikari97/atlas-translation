import type { ID, JsonObject } from '../common';
import type { LanguageDirection, OCRDirection } from '../enums';

/**
 * Translation and editing defaults for a project.
 */
export interface ProjectSettings {
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly languageDirection: LanguageDirection;
  readonly ocrDirection: OCRDirection;
  readonly autosaveEnabled: boolean;
  readonly reviewRequired: boolean;
  readonly defaultFontId?: ID<'font'>;
  readonly glossaryId?: ID<'glossary'>;
  readonly translationMemoryId?: ID<'translation-memory'>;
  readonly custom?: JsonObject;
}
