import type { JsonObject } from '@atlas/atlas-types';

/**
 * Options for diff generation.
 */
export interface DiffOptions {
  readonly includeUnchanged: boolean;
  readonly detectMoves: boolean;
  readonly custom?: JsonObject;
}
