import type { ID, Timestamp } from '@atlas/atlas-types';

/**
 * Reference to a history entry eligible for undo.
 */
export interface UndoEntry {
  readonly historyEntryId: ID<'command-history-entry'>;
  readonly pushedAt: Timestamp;
}
