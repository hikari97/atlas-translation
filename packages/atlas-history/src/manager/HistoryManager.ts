import type { HistoryEntry, HistoryState } from '../model';
import { createHistoryState } from '../model';

export class HistoryManager {
  private state: HistoryState;

  public constructor(limit = 100) {
    this.state = createHistoryState(limit);
  }

  public current(): HistoryState {
    return this.state;
  }

  public push(entry: HistoryEntry): HistoryState {
    const retained = this.state.entries.slice(0, this.state.cursor + 1);
    const entries = [...retained, entry].slice(-this.state.limit);
    this.state = { ...this.state, entries, cursor: entries.length - 1 };
    return this.state;
  }

  public undo(): HistoryEntry | null {
    if (this.state.cursor <= 0) {
      return null;
    }
    this.state = { ...this.state, cursor: this.state.cursor - 1 };
    return this.state.entries[this.state.cursor] ?? null;
  }

  public redo(): HistoryEntry | null {
    if (this.state.cursor >= this.state.entries.length - 1) {
      return null;
    }
    this.state = { ...this.state, cursor: this.state.cursor + 1 };
    return this.state.entries[this.state.cursor] ?? null;
  }
}
