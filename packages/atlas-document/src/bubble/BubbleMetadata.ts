import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Audit metadata for a bubble document.
 */
export interface BubbleMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly custom?: JsonObject;
}
