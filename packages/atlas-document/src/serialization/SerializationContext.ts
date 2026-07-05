import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { SerializationOptions } from './SerializationOptions';

/**
 * Context passed to serializer implementations.
 */
export interface SerializationContext {
  readonly requestId: ID<'serialization-request'>;
  readonly createdAt: Timestamp;
  readonly options: SerializationOptions;
  readonly custom?: JsonObject;
}
