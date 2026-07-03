/**
 * Confidence scores associated with generated and reviewed translation data.
 */
export interface TranslationConfidence {
  readonly provider: number;
  readonly glossary?: number;
  readonly review?: number;
  readonly overall: number;
}
