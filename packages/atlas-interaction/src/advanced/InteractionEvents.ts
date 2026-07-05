import type { Event, EventBus, EventContext, EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import type { Timestamp } from '@atlas/atlas-types';
import type { InteractionState } from '../foundation';

export class InteractionEventPublisher {
  public constructor(private readonly bus: EventBus) {}

  public publish(state: InteractionState, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: `interaction.${state.id}` as EventId,
      type: 'interaction.updated' as EventType,
      payload: {
        interactionId: String(state.id),
        phase: state.phase,
        type: state.type
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
