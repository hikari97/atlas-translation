import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Ownership and audit metadata for a project.
 */
export interface ProjectMetadata {
  readonly author: Nullable<string>;
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly version: string;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
