import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Audit metadata for a layer document.
 */
export interface LayerMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly custom?: JsonObject;
}
