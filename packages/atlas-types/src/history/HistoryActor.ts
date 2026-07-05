import type { ID, JsonObject, Nullable } from '../common';

/**
 * Principal that caused a history entry.
 */
export interface HistoryActor {
  readonly id: ID;
  readonly type: string;
  readonly displayName: string;
  readonly email: Nullable<string>;
  readonly metadata?: JsonObject;
}
