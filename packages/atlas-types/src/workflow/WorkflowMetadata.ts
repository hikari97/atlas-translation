import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Descriptive and audit metadata for a workflow definition.
 */
export interface WorkflowMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly version: string;
  readonly summary: Nullable<string>;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
