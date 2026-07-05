import type { EventJournalEntry } from './EventJournalEntry';

export interface EventJournal {
  append(entry: EventJournalEntry): void;
  list(): readonly EventJournalEntry[];
  clear(): void;
}
