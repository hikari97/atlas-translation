import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Ownership, import, and audit metadata for a page.
 */
export interface PageMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly importedAt?: Timestamp;
  readonly sourceFileName: Nullable<string>;
  readonly originalFileName: Nullable<string>;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
