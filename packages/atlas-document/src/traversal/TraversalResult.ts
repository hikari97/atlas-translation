import type { ID } from '@atlas/atlas-types';

/**
 * Result of a traversal operation.
 */
export interface TraversalResult {
  readonly visitedIds: readonly ID[];
  readonly visitedCount: number;
}
