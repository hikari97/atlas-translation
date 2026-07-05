import type { JsonObject } from '@atlas/atlas-types';

/**
 * Format-independent serialization options.
 */
export interface SerializationOptions {
  readonly includeMetadata: boolean;
  readonly includeDiagnostics: boolean;
  readonly custom?: JsonObject;
}
