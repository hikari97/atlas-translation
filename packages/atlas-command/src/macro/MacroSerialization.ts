import type { JsonObject } from '@atlas/atlas-types';

/**
 * Serialized macro representation.
 */
export interface MacroSerialization {
  readonly version: string;
  readonly data: JsonObject;
}
