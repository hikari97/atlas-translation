import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Descriptive and audit metadata for a plugin.
 */
export interface PluginMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly homepage: Nullable<string>;
  readonly repository: Nullable<string>;
  readonly license: Nullable<string>;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
