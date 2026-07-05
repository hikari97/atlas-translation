import type { EventType } from '../event';
import type { SubscriberDescriptor } from '../subscriber';

export class SubscriptionIndex {
  public byType(descriptors: readonly SubscriberDescriptor[], eventType: EventType): readonly SubscriberDescriptor[] {
    return descriptors
      .filter((descriptor) => descriptor.eventType === eventType)
      .sort((left, right) => right.priority - left.priority);
  }
}
