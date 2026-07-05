import type { JsonObject } from '@atlas/atlas-types';
import type { TraversalStrategy } from './TraversalStrategy';

/**
 * Options for document traversal.
 */
export interface TraversalOptions {
  readonly strategy: TraversalStrategy;
  readonly includeRoot: boolean;
  readonly custom?: JsonObject;
}
