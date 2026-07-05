import type { Event } from '../event';

export interface EventJournalEntry {
  readonly event: Event;
  readonly sequence: number;
}
