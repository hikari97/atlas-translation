import type { EventType } from '../event';
import type { EventSubscriber } from './EventSubscriber';

export interface SubscriberDescriptor {
  readonly id: string;
  readonly eventType: EventType;
  readonly priority: number;
  readonly subscriber: EventSubscriber;
}
