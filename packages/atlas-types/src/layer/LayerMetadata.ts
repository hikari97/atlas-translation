import type { ID, JsonObject, Timestamp } from '../common';

/**
 * Ownership and audit metadata for a layer.
 */
export interface LayerMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
