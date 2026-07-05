import type { SubscriberDescriptor } from '../subscriber';

export interface SubscriptionRegistry {
  subscribe(descriptor: SubscriberDescriptor): void;
  unsubscribe(id: string): boolean;
  list(): readonly SubscriberDescriptor[];
}
