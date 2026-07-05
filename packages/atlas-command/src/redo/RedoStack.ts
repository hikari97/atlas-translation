import type { RedoEntry } from './RedoEntry';

/**
 * LIFO stack for redo history references.
 */
export interface RedoStack {
  push(entry: RedoEntry): void;
  pop(): RedoEntry | undefined;
  peek(): RedoEntry | undefined;
  clear(): void;
  size(): number;
}
