import type { EventContext } from '../context';
import type { Event } from '../event';
import { EventPublicationStatus, type EventPublicationResult } from '../result';
import type { SubscriberDescriptor } from '../subscriber';
import { SubscriptionManager } from '../subscription';
import { PublicationBehaviorCoordinator } from '../behavior';
import type { EventBehavior } from '../behavior';
import type { EventBus } from './EventBus';

export class DefaultEventBus implements EventBus {
  private readonly subscriptions = new SubscriptionManager();
  private readonly coordinator: PublicationBehaviorCoordinator;

  public constructor(behaviors: readonly EventBehavior[] = []) {
    this.coordinator = new PublicationBehaviorCoordinator(behaviors);
  }

  public subscribe(descriptor: SubscriberDescriptor): void {
    this.subscriptions.subscribe(descriptor);
  }

  public unsubscribe(id: string): boolean {
    return this.subscriptions.unsubscribe(id);
  }

  public publish(event: Event, context: EventContext): Promise<EventPublicationResult> {
    return this.coordinator.execute(event, context, async () => {
      const subscribers = this.subscriptions.match(event);
      const errors = [];
      for (const descriptor of subscribers) {
        try {
          await descriptor.subscriber.handle(event, context);
        } catch (error) {
          errors.push({
            code: 'subscriber_error',
            message: error instanceof Error ? error.message : 'Subscriber failed',
            cause: descriptor.id
          });
        }
      }
      return {
        status: errors.length === 0 ? EventPublicationStatus.Published : EventPublicationStatus.Failed,
        deliveredCount: subscribers.length - errors.length,
        errors
      };
    });
  }
}
