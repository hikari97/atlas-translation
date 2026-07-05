import type { SerializationContext } from './SerializationContext';
import type { SerializationResult } from './SerializationResult';

/**
 * Contract for format-specific document deserializers.
 */
export interface Deserializer<TSource, TDocument> {
  deserialize(source: TSource, context: SerializationContext): SerializationResult<TDocument>;
}
