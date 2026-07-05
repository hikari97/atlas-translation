import type { ID, Timestamp } from '@atlas/atlas-types';

/**
 * Reference to a history entry eligible for redo.
 */
export interface RedoEntry {
  readonly historyEntryId: ID<'command-history-entry'>;
  readonly pushedAt: Timestamp;
}
