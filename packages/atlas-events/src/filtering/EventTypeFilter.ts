import type { Event, EventType } from '../event';
import type { EventFilter } from './EventFilter';

export class EventTypeFilter implements EventFilter {
  public constructor(private readonly eventType: EventType) {}

  public matches(event: Event): boolean {
    return event.type === this.eventType;
  }
}
