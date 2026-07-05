import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Immutable data snapshot attached to a history entry.
 */
export interface HistorySnapshot {
  readonly id: ID<'history-snapshot'>;
  readonly targetId: ID;
  readonly revision: number;
  readonly capturedAt: Timestamp;
  readonly checksum: Nullable<string>;
  readonly data: JsonObject;
}
