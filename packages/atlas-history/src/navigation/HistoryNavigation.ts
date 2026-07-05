import type { HistoryEntry, HistoryState } from '../model';

export function historyCursor(state: HistoryState): number {
  return state.cursor;
}

export function canUndo(state: HistoryState): boolean {
  return state.cursor > 0;
}

export function canRedo(state: HistoryState): boolean {
  return state.cursor < state.entries.length - 1;
}

export function currentEntry(state: HistoryState): HistoryEntry | null {
  return state.entries[state.cursor] ?? null;
}

export function enforceHistoryLimit(entries: readonly HistoryEntry[], limit: number): readonly HistoryEntry[] {
  return entries.slice(-limit);
}
