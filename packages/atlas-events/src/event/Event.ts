import type { JsonObject } from '@atlas/atlas-types';
import type { EventId } from './EventId';
import type { EventMetadata } from './EventMetadata';
import type { EventType } from './EventType';

export interface Event<TPayload extends JsonObject = JsonObject> {
  readonly id: EventId;
  readonly type: EventType;
  readonly payload: TPayload;
  readonly metadata: EventMetadata;
}
