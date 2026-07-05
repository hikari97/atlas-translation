import type { Event } from '../event';
import type { EventContext } from '../context';

export interface EventSubscriber<TEvent extends Event = Event> {
  handle(event: TEvent, context: EventContext): void | Promise<void>;
}
