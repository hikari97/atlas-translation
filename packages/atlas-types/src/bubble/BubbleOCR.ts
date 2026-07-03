import type { ID, JsonObject, Nullable, Timestamp } from '../common';
import type { OCRDirection } from '../enums';

/**
 * OCR result snapshot associated with a bubble.
 */
export interface BubbleOCR {
  readonly providerId: Nullable<ID<'plugin'>>;
  readonly text: Nullable<string>;
  readonly correctedText: Nullable<string>;
  readonly language: string;
  readonly direction: OCRDirection;
  readonly confidence: number;
  readonly detectedAt?: Timestamp;
  readonly raw?: JsonObject;
}
