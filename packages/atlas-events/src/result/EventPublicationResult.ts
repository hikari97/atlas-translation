import type { EventPublicationError } from './EventPublicationError';
import type { EventPublicationStatus } from './EventPublicationStatus';

export interface EventPublicationResult {
  readonly status: EventPublicationStatus;
  readonly deliveredCount: number;
  readonly errors: readonly EventPublicationError[];
}
