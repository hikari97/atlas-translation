import type { EventJournal } from './EventJournal';
import type { EventJournalEntry } from './EventJournalEntry';

export class DefaultEventJournal implements EventJournal {
  private readonly entries: EventJournalEntry[] = [];

  public append(entry: EventJournalEntry): void {
    this.entries.push(entry);
  }

  public list(): readonly EventJournalEntry[] {
    return [...this.entries];
  }

  public clear(): void {
    this.entries.length = 0;
  }
}
