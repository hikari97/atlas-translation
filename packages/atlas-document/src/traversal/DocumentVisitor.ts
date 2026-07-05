import type { TraversalContext } from './TraversalContext';

/**
 * Visitor callback contract for document traversal.
 */
export interface DocumentVisitor<TNode> {
  visit(node: TNode, context: TraversalContext): void;
}
