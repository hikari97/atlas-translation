import type { ID } from '@atlas/atlas-types';

/**
 * Target document node for a mutation.
 */
export interface MutationTarget {
  readonly id: ID;
  readonly type: string;
  readonly path: string;
}
