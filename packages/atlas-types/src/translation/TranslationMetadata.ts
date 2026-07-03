import type { ID, JsonObject, Timestamp } from '../common';
import type { TranslationTag } from './TranslationTag';

/**
 * Ownership, audit, and workflow metadata for a translation.
 */
export interface TranslationMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly translatedAt?: Timestamp;
  readonly source: 'manual' | 'machine' | 'imported';
  readonly tags: readonly TranslationTag[];
  readonly custom?: JsonObject;
}
