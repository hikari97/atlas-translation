import type { ID } from '@atlas/atlas-types';

/**
 * Result returned by mutation execution.
 */
export interface MutationResult<TDocument> {
  readonly success: boolean;
  readonly document: TDocument;
  readonly changedIds: readonly ID[];
  readonly errors: readonly string[];
}
