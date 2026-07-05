import type { EventContext } from '../context';
import type { Event } from '../event';
import type { EventPublicationResult } from '../result';
import type { SubscriberDescriptor } from '../subscriber';

export interface EventBus {
  publish(event: Event, context: EventContext): Promise<EventPublicationResult>;
  subscribe(descriptor: SubscriberDescriptor): void;
  unsubscribe(id: string): boolean;
}
