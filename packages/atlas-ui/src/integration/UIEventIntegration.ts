import type { Event, EventBus, EventContext, EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import type { Timestamp } from '@atlas/atlas-types';
import type { UIComponentDescriptor } from '../contracts';

export class UIEventIntegration {
  public constructor(private readonly bus: EventBus) {}

  public publishComponentMounted(component: UIComponentDescriptor, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: `ui.mounted.${component.id}` as EventId,
      type: 'ui.component.mounted' as EventType,
      payload: {
        componentId: String(component.id),
        kind: component.kind
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
