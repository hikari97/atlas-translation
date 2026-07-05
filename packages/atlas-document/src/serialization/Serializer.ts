import type { SerializationContext } from './SerializationContext';
import type { SerializationResult } from './SerializationResult';

/**
 * Contract for format-specific document serializers.
 */
export interface Serializer<TDocument, TResult> {
  serialize(document: TDocument, context: SerializationContext): SerializationResult<TResult>;
}
