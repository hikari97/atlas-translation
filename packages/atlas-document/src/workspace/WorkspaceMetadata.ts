import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Audit metadata for a workspace document.
 */
export interface WorkspaceMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly custom?: JsonObject;
}
