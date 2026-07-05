import type { SubscriberDescriptor } from '../subscriber';
import { DefaultSubscriptionRegistry } from './DefaultSubscriptionRegistry';
import { SubscriptionMatcher } from './SubscriptionMatcher';
import type { Event } from '../event';

export class SubscriptionManager {
  private readonly registry = new DefaultSubscriptionRegistry();
  private readonly matcher = new SubscriptionMatcher();

  public subscribe(descriptor: SubscriberDescriptor): void {
    this.registry.subscribe(descriptor);
  }

  public unsubscribe(id: string): boolean {
    return this.registry.unsubscribe(id);
  }

  public match(event: Event): readonly SubscriberDescriptor[] {
    return this.matcher.match(event, this.registry.list());
  }

  public list(): readonly SubscriberDescriptor[] {
    return this.registry.list();
  }
}
