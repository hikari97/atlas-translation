import type { ID } from '@atlas/atlas-types';
import type { HistoryEntry } from './HistoryEntry';
import type { HistoryQuery } from './HistoryQuery';
import type { HistoryStore } from './HistoryStore';

/**
 * In-memory command history store.
 */
export class DefaultHistoryStore implements HistoryStore {
  private readonly entries = new Map<ID<'command-history-entry'>, HistoryEntry>();

  public record(entry: HistoryEntry): void {
    this.entries.set(entry.id, entry);
  }

  public get(id: ID<'command-history-entry'>): HistoryEntry | undefined {
    return this.entries.get(id);
  }

  public query(query: HistoryQuery = {}): readonly HistoryEntry[] {
    const entries = [...this.entries.values()].filter((entry) => {
      const commandMatches = query.filter?.commandName === undefined || entry.commandName === query.filter.commandName;
      const statusMatches = query.filter?.status === undefined || entry.status === query.filter.status;
      return commandMatches && statusMatches;
    });

    if (query.cursor === undefined) {
      return entries;
    }

    return entries.slice(query.cursor.offset, query.cursor.offset + query.cursor.limit);
  }

  public remove(id: ID<'command-history-entry'>): boolean {
    return this.entries.delete(id);
  }

  public clear(): void {
    this.entries.clear();
  }

  public size(): number {
    return this.entries.size;
  }
}
