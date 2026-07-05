import type { ID, Nullable, Timestamp } from '@atlas/atlas-types';

/**
 * Review state for translated content.
 */
export interface TranslationReview {
  readonly reviewed: boolean;
  readonly reviewedBy: Nullable<ID<'user'>>;
  readonly reviewedAt: Nullable<Timestamp>;
  readonly note: Nullable<string>;
}
