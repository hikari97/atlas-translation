import type { ID, Nullable, Timestamp } from '../common';
import type { TranslationStatus } from '../enums';

/**
 * Historical revision entry for a translation.
 */
export interface TranslationHistoryEntry {
  readonly id: ID<'translation-history-entry'>;
  readonly revision: number;
  readonly text: string;
  readonly status: TranslationStatus;
  readonly authorId: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly note: Nullable<string>;
}

/**
 * Ordered revision history for a translation.
 */
export interface TranslationHistory {
  readonly entries: readonly TranslationHistoryEntry[];
  readonly currentRevision: number;
}
