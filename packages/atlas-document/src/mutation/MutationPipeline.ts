import type { DocumentMutation } from './DocumentMutation';
import type { MutationContext } from './MutationContext';
import type { MutationResult } from './MutationResult';

/**
 * Sequential mutation pipeline.
 */
export class MutationPipeline<TDocument> {
  private readonly mutations: DocumentMutation<TDocument>[];

  public constructor(mutations: readonly DocumentMutation<TDocument>[] = []) {
    this.mutations = [...mutations];
  }

  public add(mutation: DocumentMutation<TDocument>): void {
    this.mutations.push(mutation);
  }

  public run(document: TDocument, context: MutationContext): MutationResult<TDocument> {
    let currentDocument = document;
    const changedIds = [];
    const errors = [];

    for (const mutation of this.mutations) {
      const result = mutation.apply(currentDocument, context);
      if (!result.success) {
        return {
          success: false,
          document: currentDocument,
          changedIds,
          errors: result.errors
        };
      }
      currentDocument = result.document;
      changedIds.push(...result.changedIds);
      errors.push(...result.errors);
    }

    return {
      success: true,
      document: currentDocument,
      changedIds,
      errors
    };
  }
}
