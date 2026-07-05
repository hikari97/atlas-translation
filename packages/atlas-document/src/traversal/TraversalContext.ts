import type { ID, JsonObject } from '@atlas/atlas-types';

/**
 * Context passed to visitor callbacks.
 */
export interface TraversalContext {
  readonly rootId: ID;
  readonly path: readonly ID[];
  readonly depth: number;
  readonly custom?: JsonObject;
}
