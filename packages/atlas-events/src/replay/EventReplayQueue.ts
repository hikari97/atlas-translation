import type { EventJournalEntry } from '../journal';

export class EventReplayQueue {
  private readonly entries: EventJournalEntry[] = [];

  public enqueue(entry: EventJournalEntry): void {
    this.entries.push(entry);
  }

  public dequeue(): EventJournalEntry | undefined {
    return this.entries.shift();
  }

  public size(): number {
    return this.entries.length;
  }
}
