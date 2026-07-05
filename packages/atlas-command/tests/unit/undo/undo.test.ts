import { DefaultUndoStack } from '@atlas/atlas-command';
import type { ID, Timestamp } from '@atlas/atlas-types';

const undo = new DefaultUndoStack();
undo.push({
  historyEntryId: 'history-1' as ID<'command-history-entry'>,
  pushedAt: '2026-07-03T00:00:00.000Z' as Timestamp
});

export const undoResult = undo.peek();
