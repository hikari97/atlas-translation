/**
 * Format-independent serialization error.
 */
export interface SerializationError {
  readonly code: string;
  readonly message: string;
  readonly path: string | null;
}
