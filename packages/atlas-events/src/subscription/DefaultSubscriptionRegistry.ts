import type { SubscriberDescriptor } from '../subscriber';
import type { SubscriptionRegistry } from './SubscriptionRegistry';

export class DefaultSubscriptionRegistry implements SubscriptionRegistry {
  private readonly descriptors = new Map<string, SubscriberDescriptor>();

  public subscribe(descriptor: SubscriberDescriptor): void {
    this.descriptors.set(descriptor.id, descriptor);
  }

  public unsubscribe(id: string): boolean {
    return this.descriptors.delete(id);
  }

  public list(): readonly SubscriberDescriptor[] {
    return [...this.descriptors.values()];
  }
}
