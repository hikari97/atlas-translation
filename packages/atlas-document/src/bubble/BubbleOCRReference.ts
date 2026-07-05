import type { ID, Nullable } from '@atlas/atlas-types';

/**
 * OCR result reference used by a bubble.
 */
export interface BubbleOCRReference {
  readonly ocrId: Nullable<ID<'ocr-result'>>;
  readonly confidence: number | null;
}
