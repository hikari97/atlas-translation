import { DefaultRedoStack } from '@atlas/atlas-command';
import type { ID, Timestamp } from '@atlas/atlas-types';

const redo = new DefaultRedoStack();
redo.push({
  historyEntryId: 'history-1' as ID<'command-history-entry'>,
  pushedAt: '2026-07-03T00:00:00.000Z' as Timestamp
});

export const redoResult = redo.peek();
