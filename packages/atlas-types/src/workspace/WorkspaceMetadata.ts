import type { ID, JsonObject, Timestamp } from '../common';

/**
 * Ownership and audit metadata for a workspace.
 */
export interface WorkspaceMetadata {
  readonly ownerId: ID<'user'>;
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly version: string;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
