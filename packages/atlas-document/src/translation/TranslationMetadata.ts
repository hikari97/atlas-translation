import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Audit metadata for a translation document.
 */
export interface TranslationMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly custom?: JsonObject;
}
