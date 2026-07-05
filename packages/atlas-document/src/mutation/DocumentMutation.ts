import type { MutationContext } from './MutationContext';
import type { MutationResult } from './MutationResult';
import type { MutationTarget } from './MutationTarget';

/**
 * Contract for one document mutation.
 */
export interface DocumentMutation<TDocument> {
  readonly id: string;
  readonly target: MutationTarget;
  apply(document: TDocument, context: MutationContext): MutationResult<TDocument>;
}
