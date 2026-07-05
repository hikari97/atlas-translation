import type { JsonObject } from '@atlas/atlas-types';
import type { Event, EventId, EventMetadata, EventType } from '../event';
import type { CompositeEvent } from './CompositeEvent';

export class EventComposer {
  public compose(
    id: EventId,
    type: EventType,
    events: readonly Event[],
    metadata: EventMetadata,
    payload: JsonObject = {}
  ): CompositeEvent {
    return { id, type, events, metadata, payload };
  }
}
