import type { JsonObject } from '@atlas/atlas-types';

/**
 * Optional metadata attached to command definitions.
 */
export interface CommandMetadata {
  readonly description: string;
  readonly tags: readonly string[];
  readonly custom?: JsonObject;
}
