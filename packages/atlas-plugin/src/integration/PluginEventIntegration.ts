import type { Event, EventBus, EventContext, EventPublicationResult, EventSubscriber, EventType } from '@atlas/atlas-events';

export interface PluginEventIntegration {
  publish(event: Event, context: EventContext): Promise<EventPublicationResult>;
  subscribe<TEvent extends Event>(type: EventType, subscriber: EventSubscriber<TEvent>): void;
}

export class EventBusPluginIntegration implements PluginEventIntegration {
  public constructor(private readonly bus: EventBus) {}

  public publish(event: Event, context: EventContext): Promise<EventPublicationResult> {
    return this.bus.publish(event, context);
  }

  public subscribe<TEvent extends Event>(type: EventType, subscriber: EventSubscriber<TEvent>): void {
    this.bus.subscribe({
      id: `${String(type)}:plugin-subscriber`,
      eventType: type,
      priority: 0,
      subscriber: subscriber as EventSubscriber
    });
  }
}
