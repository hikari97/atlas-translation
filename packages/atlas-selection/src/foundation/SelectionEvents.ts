import type { Event, EventBus, EventContext, EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import type { SelectionState, Timestamp } from '@atlas/atlas-types';

export class SelectionEventPublisher {
  public constructor(private readonly bus: EventBus) {}

  public publishChanged(state: SelectionState, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: 'selection.changed' as EventId,
      type: 'selection.changed' as EventType,
      payload: {
        count: state.items.length,
        mode: state.mode
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
