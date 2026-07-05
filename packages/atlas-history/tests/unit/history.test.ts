import { HistoryManager, canUndo, createHistoryEntry } from '@atlas/atlas-history';

const manager = new HistoryManager();
manager.push(createHistoryEntry('entry-1', 'First', { value: 1 }));
manager.push(createHistoryEntry('entry-2', 'Second', { value: 2 }));

const undoEntry = manager.undo();
const canUndoNow: boolean = canUndo(manager.current());
const undoLabel = undoEntry?.label;

export { canUndoNow, undoLabel };
