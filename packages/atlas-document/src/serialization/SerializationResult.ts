import type { SerializationError } from './SerializationError';

/**
 * Result returned by serializer implementations.
 */
export interface SerializationResult<TResult> {
  readonly success: boolean;
  readonly value: TResult | null;
  readonly errors: readonly SerializationError[];
}
