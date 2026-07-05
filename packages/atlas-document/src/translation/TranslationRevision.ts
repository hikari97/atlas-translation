import type { ID, Nullable, Timestamp } from '@atlas/atlas-types';

/**
 * Immutable translation revision entry.
 */
export interface TranslationRevision {
  readonly id: ID<'translation-revision'>;
  readonly text: string;
  readonly authorId: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly note: Nullable<string>;
}
