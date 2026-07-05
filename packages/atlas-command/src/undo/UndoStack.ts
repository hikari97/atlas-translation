import type { UndoEntry } from './UndoEntry';

/**
 * LIFO stack for undo history references.
 */
export interface UndoStack {
  push(entry: UndoEntry): void;
  pop(): UndoEntry | undefined;
  peek(): UndoEntry | undefined;
  clear(): void;
  size(): number;
}
