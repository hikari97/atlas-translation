import type { ID } from '@atlas/atlas-types';
import type { DocumentVisitor } from './DocumentVisitor';
import type { TraversalContext } from './TraversalContext';
import type { TraversalOptions } from './TraversalOptions';
import type { TraversalResult } from './TraversalResult';
import { TraversalStrategy } from './TraversalStrategy';

/**
 * Minimal tree node contract for traversable documents.
 */
export interface TraversableDocumentNode {
  readonly id: ID;
  readonly children?: readonly TraversableDocumentNode[];
}

interface TraversalQueueEntry {
  readonly node: TraversableDocumentNode;
  readonly path: readonly ID[];
}

/**
 * Strategy-based traverser for document trees.
 */
export class DocumentTraverser {
  public traverse(
    root: TraversableDocumentNode,
    visitor: DocumentVisitor<TraversableDocumentNode>,
    options: TraversalOptions
  ): TraversalResult {
    return options.strategy === TraversalStrategy.BreadthFirst
      ? this.traverseBreadthFirst(root, visitor, options)
      : this.traverseDepthFirst(root, visitor, options);
  }

  private traverseDepthFirst(
    root: TraversableDocumentNode,
    visitor: DocumentVisitor<TraversableDocumentNode>,
    options: TraversalOptions
  ): TraversalResult {
    const visitedIds: ID[] = [];
    const visitNode = (node: TraversableDocumentNode, path: readonly ID[]): void => {
      const nextPath = [...path, node.id];
      if (options.includeRoot || node.id !== root.id) {
        this.visitNode(root.id, node, nextPath, visitor, visitedIds);
      }
      node.children?.forEach((child) => visitNode(child, nextPath));
    };

    visitNode(root, []);

    return {
      visitedIds,
      visitedCount: visitedIds.length
    };
  }

  private traverseBreadthFirst(
    root: TraversableDocumentNode,
    visitor: DocumentVisitor<TraversableDocumentNode>,
    options: TraversalOptions
  ): TraversalResult {
    const visitedIds: ID[] = [];
    const queue: TraversalQueueEntry[] = [{ node: root, path: [] }];

    while (queue.length > 0) {
      const entry = queue.shift();
      if (entry === undefined) {
        continue;
      }

      const nextPath = [...entry.path, entry.node.id];
      if (options.includeRoot || entry.node.id !== root.id) {
        this.visitNode(root.id, entry.node, nextPath, visitor, visitedIds);
      }

      entry.node.children?.forEach((child) => {
        queue.push({ node: child, path: nextPath });
      });
    }

    return {
      visitedIds,
      visitedCount: visitedIds.length
    };
  }

  private visitNode(
    rootId: ID,
    node: TraversableDocumentNode,
    path: readonly ID[],
    visitor: DocumentVisitor<TraversableDocumentNode>,
    visitedIds: ID[]
  ): void {
    const context: TraversalContext = {
      rootId,
      path,
      depth: path.length - 1
    };
    visitor.visit(node, context);
    visitedIds.push(node.id);
  }
}
