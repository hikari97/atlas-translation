import type { JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Metadata describing a document collection.
 */
export interface CollectionMetadata {
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly custom?: JsonObject;
}
