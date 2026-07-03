import type { ID, Nullable, Timestamp } from '../common';
import type { TranslationStatus } from '../enums';

/**
 * Review state for a translation.
 */
export interface TranslationReview {
  readonly status: TranslationStatus;
  readonly reviewedBy?: ID<'user'>;
  readonly reviewedAt?: Timestamp;
  readonly approvedBy?: ID<'user'>;
  readonly approvedAt?: Timestamp;
  readonly notes: Nullable<string>;
}
