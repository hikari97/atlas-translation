import type { HistoryEntry } from '../model';

export interface HistoryTransaction {
  readonly id: string;
  readonly entries: readonly HistoryEntry[];
}

export function createHistoryTransaction(id: string, entries: readonly HistoryEntry[]): HistoryTransaction {
  return { id, entries: entries.slice() };
}

export function mergeHistory(entries: readonly HistoryEntry[]): HistoryEntry | null {
  return entries.at(-1) ?? null;
}

export function compressHistory(entries: readonly HistoryEntry[]): readonly HistoryEntry[] {
  return [...new Map(entries.map((entry) => [entry.id, entry])).values()];
}

export function batchHistory(entries: readonly HistoryEntry[], size: number): readonly (readonly HistoryEntry[])[] {
  const batches: HistoryEntry[][] = [];
  for (let index = 0; index < entries.length; index += size) {
    batches.push(entries.slice(index, index + size));
  }
  return batches;
}
