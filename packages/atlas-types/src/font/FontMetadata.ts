import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Ownership and descriptive metadata for a font.
 */
export interface FontMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly source: 'system' | 'local' | 'embedded' | 'custom' | 'imported';
  readonly version: Nullable<string>;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
