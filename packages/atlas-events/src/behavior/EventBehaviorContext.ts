import type { EventContext } from '../context';
import type { Event } from '../event';

export interface EventBehaviorContext<TEvent extends Event = Event> {
  readonly event: TEvent;
  readonly context: EventContext;
}
