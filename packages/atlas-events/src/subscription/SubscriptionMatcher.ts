import type { Event } from '../event';
import type { SubscriberDescriptor } from '../subscriber';
import { SubscriptionIndex } from './SubscriptionIndex';

export class SubscriptionMatcher {
  private readonly index = new SubscriptionIndex();

  public match(event: Event, descriptors: readonly SubscriberDescriptor[]): readonly SubscriberDescriptor[] {
    return this.index.byType(descriptors, event.type);
  }
}
