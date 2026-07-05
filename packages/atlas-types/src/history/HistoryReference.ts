import type { ID, Timestamp } from '../common';
import type { HistoryAction as HistoryActionKind } from '../enums';

/**
 * Lightweight reference to a history entry.
 */
export interface HistoryReference {
  readonly id: ID<'history-entry'>;
  readonly targetId: ID;
  readonly targetType: string;
  readonly action: HistoryActionKind;
  readonly actorId: ID;
  readonly createdAt: Timestamp;
}
