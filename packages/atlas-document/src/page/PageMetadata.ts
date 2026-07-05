import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Audit metadata for a page document.
 */
export interface PageMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly custom?: JsonObject;
}
