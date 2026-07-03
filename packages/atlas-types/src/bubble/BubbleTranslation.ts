import type { ID, JsonObject, Nullable, Timestamp } from '../common';
import type { TranslationStatus } from '../enums';

/**
 * Current translation snapshot associated with a bubble.
 */
export interface BubbleTranslation {
  readonly translationId?: ID<'translation'>;
  readonly providerId: Nullable<ID<'plugin'>>;
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly text: Nullable<string>;
  readonly reviewedText: Nullable<string>;
  readonly status: TranslationStatus;
  readonly confidence: number;
  readonly translatedAt?: Timestamp;
  readonly raw?: JsonObject;
}
