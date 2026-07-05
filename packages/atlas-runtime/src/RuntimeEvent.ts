import type { RuntimeEventMetadata } from './RuntimeEventMetadata';
import type { RuntimeEventPayload } from './RuntimeEventPayload';
import type { RuntimeEventSource } from './RuntimeEventSource';
import type { RuntimeEventType } from './RuntimeEventType';

export interface RuntimeEvent {
  readonly id: string;
  readonly type: RuntimeEventType;
  readonly source: RuntimeEventSource;
  readonly occurredAt: Date;
  readonly payload: RuntimeEventPayload;
  readonly metadata: RuntimeEventMetadata;
}

export const createRuntimeEvent = (
  id: string,
  type: RuntimeEventType,
  source: RuntimeEventSource,
  occurredAt: Date,
  payload: RuntimeEventPayload,
  metadata: RuntimeEventMetadata,
): RuntimeEvent => ({
  id,
  type,
  source,
  occurredAt,
  payload,
  metadata,
});
