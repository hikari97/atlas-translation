import type { ID, JsonObject, Nullable } from '../common';

/**
 * Entity affected by a history entry.
 */
export interface HistoryTarget {
  readonly id: ID;
  readonly type: string;
  readonly name: Nullable<string>;
  readonly parentId: Nullable<ID>;
  readonly metadata?: JsonObject;
}
