import type { RedoEntry } from './RedoEntry';
import type { RedoPolicy } from './RedoPolicy';
import type { RedoStack } from './RedoStack';
import { RedoOverflowError } from './errors/RedoOverflowError';

/**
 * In-memory LIFO redo stack.
 */
export class DefaultRedoStack implements RedoStack {
  private readonly entries: RedoEntry[] = [];

  public constructor(private readonly policy: RedoPolicy = { maxEntries: 100 }) {}

  public push(entry: RedoEntry): void {
    if (this.entries.length >= this.policy.maxEntries) {
      throw new RedoOverflowError();
    }
    this.entries.push(entry);
  }

  public pop(): RedoEntry | undefined {
    return this.entries.pop();
  }

  public peek(): RedoEntry | undefined {
    return this.entries.at(-1);
  }

  public clear(): void {
    this.entries.length = 0;
  }

  public size(): number {
    return this.entries.length;
  }
}
