import type { Timestamp } from '@atlas/atlas-types';
import type { EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority, EventPublicationStatus } from '@atlas/atlas-events';
import { DefaultPluginContext } from '@atlas/atlas-plugin';

const context = new DefaultPluginContext();
const result: EventPublicationResult = await context.publish({
  id: 'event-1' as EventId,
  type: 'atlas.test.event' as EventType,
  payload: {},
  metadata: {
    priority: EventPriority.Normal,
    occurredAt: new Date().toISOString() as Timestamp,
    correlationId: null
  }
});

const eventStatus: EventPublicationStatus = result.status;

export { eventStatus };
