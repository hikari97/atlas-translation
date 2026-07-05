import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Audit metadata for a history entry.
 */
export interface HistoryMetadata {
  readonly createdAt: Timestamp;
  readonly requestId: Nullable<ID<'request'>>;
  readonly sessionId: Nullable<ID<'editor-session'>>;
  readonly source: string;
  readonly note: Nullable<string>;
  readonly custom?: JsonObject;
}
