import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { ServiceProvider } from '../service';

export interface RuntimeContext {
  readonly id: ID<'runtime-context'>;
  readonly startedAt: Timestamp;
  readonly services: ServiceProvider;
  readonly metadata?: JsonObject;
}
