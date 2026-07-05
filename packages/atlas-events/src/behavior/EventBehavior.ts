import type { Event } from '../event';
import type { EventPublicationResult } from '../result';
import type { EventBehaviorContext } from './EventBehaviorContext';
import type { EventBehaviorDelegate } from './EventBehaviorDelegate';

export interface EventBehavior<TEvent extends Event = Event> {
  handle(context: EventBehaviorContext<TEvent>, next: EventBehaviorDelegate): Promise<EventPublicationResult>;
}
