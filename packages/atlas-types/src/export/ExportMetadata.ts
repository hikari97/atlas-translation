import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Audit metadata for an export operation.
 */
export interface ExportMetadata {
  readonly requestedBy: ID<'user'>;
  readonly requestedAt: Timestamp;
  readonly completedAt: Nullable<Timestamp>;
  readonly version: string;
  readonly note: Nullable<string>;
  readonly custom?: JsonObject;
}
