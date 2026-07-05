import type { EventBus, EventContext, EventPublicationResult } from '@atlas/atlas-events';
import { EventPriority, type Event, type EventId, type EventType } from '@atlas/atlas-events';
import type { Timestamp } from '@atlas/atlas-types';
import type { RenderResult } from '../contracts';

export class RendererEventIntegration {
  public constructor(private readonly bus: EventBus) {}

  public publishRendered(result: RenderResult, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: 'renderer.rendered' as EventId,
      type: 'renderer.rendered' as EventType,
      payload: {
        status: result.status,
        hasTree: result.tree !== null
      },
      metadata: {
        priority: EventPriority.Normal,
        occurredAt: new Date().toISOString() as Timestamp,
        correlationId: null
      }
    };
    return this.bus.publish(event, context);
  }
}
