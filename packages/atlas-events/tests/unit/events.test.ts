import {
  DefaultEventBus,
  EventPriority,
  EventPublicationStatus
} from '@atlas/atlas-events';
import type { Event, EventContext, EventId, EventType } from '@atlas/atlas-events';
import type { ID, Timestamp } from '@atlas/atlas-types';

export const eventFixture = {
  id: 'event-1' as EventId,
  type: 'atlas.test' as EventType,
  payload: {},
  metadata: {
    priority: EventPriority.Normal,
    occurredAt: '2026-07-03T00:00:00.000Z' as Timestamp,
    correlationId: null
  }
} satisfies Event;

export const contextFixture = {
  id: 'event-context-1' as ID<'event-context'>,
  document: null,
  publishedAt: '2026-07-03T00:00:00.000Z' as Timestamp
} satisfies EventContext;

const bus = new DefaultEventBus();
bus.subscribe({
  id: 'subscriber-1',
  eventType: eventFixture.type,
  priority: 1,
  subscriber: {
    handle: () => undefined
  }
});

export const publication = {
  expected: EventPublicationStatus.Published,
  result: bus.publish(eventFixture, contextFixture)
};
