import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Macro recording metadata.
 */
export interface MacroMetadata {
  readonly recordedBy: ID<'user'> | null;
  readonly recordedAt: Timestamp;
  readonly description: string | null;
  readonly custom?: JsonObject;
}
