import type { JsonObject, Timestamp } from '@atlas/atlas-types';
import type { EventPriority } from './EventPriority';

export interface EventMetadata {
  readonly priority: EventPriority;
  readonly occurredAt: Timestamp;
  readonly correlationId: string | null;
  readonly custom?: JsonObject;
}
