import type { ID } from '@atlas/atlas-types';
import type { HistoryEntry } from './HistoryEntry';
import type { HistoryQuery } from './HistoryQuery';

/**
 * Append-oriented command history store.
 */
export interface HistoryStore {
  record(entry: HistoryEntry): void;
  get(id: ID<'command-history-entry'>): HistoryEntry | undefined;
  query(query?: HistoryQuery): readonly HistoryEntry[];
  remove(id: ID<'command-history-entry'>): boolean;
  clear(): void;
  size(): number;
}
