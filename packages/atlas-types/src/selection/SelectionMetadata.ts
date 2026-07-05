import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Audit metadata for a selection state.
 */
export interface SelectionMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly source: Nullable<string>;
  readonly custom?: JsonObject;
}
