import type { UndoEntry } from './UndoEntry';
import type { UndoPolicy } from './UndoPolicy';
import type { UndoStack } from './UndoStack';
import { UndoOverflowError } from './errors/UndoOverflowError';

/**
 * In-memory LIFO undo stack.
 */
export class DefaultUndoStack implements UndoStack {
  private readonly entries: UndoEntry[] = [];

  public constructor(private readonly policy: UndoPolicy = { maxEntries: 100 }) {}

  public push(entry: UndoEntry): void {
    if (this.entries.length >= this.policy.maxEntries) {
      throw new UndoOverflowError();
    }
    this.entries.push(entry);
  }

  public pop(): UndoEntry | undefined {
    return this.entries.pop();
  }

  public peek(): UndoEntry | undefined {
    return this.entries.at(-1);
  }

  public clear(): void {
    this.entries.length = 0;
  }

  public size(): number {
    return this.entries.length;
  }
}
