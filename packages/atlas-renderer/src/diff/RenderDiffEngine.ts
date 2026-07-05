import type { RenderTree } from '../tree';
import { RenderTreeTraverser } from '../tree';
import { RenderDiffOperationType, type RenderDiffOperation } from './RenderDiffOperation';
import type { RenderDiffResult } from './RenderDiffResult';

export class RenderDiffEngine {
  private readonly traverser = new RenderTreeTraverser();

  public diff(previous: RenderTree, next: RenderTree): RenderDiffResult {
    const previousNodes = new Map(this.traverser.flatten(previous).map((node) => [node.sourceId, node]));
    const nextNodes = new Map(this.traverser.flatten(next).map((node) => [node.sourceId, node]));
    const operations: RenderDiffOperation[] = [];

    for (const [sourceId, node] of nextNodes) {
      const previousNode = previousNodes.get(sourceId);
      if (previousNode === undefined) {
        operations.push({ type: RenderDiffOperationType.Add, sourceId, node });
      } else if (JSON.stringify(previousNode) !== JSON.stringify(node)) {
        operations.push({ type: RenderDiffOperationType.Update, sourceId, node });
      }
    }

    for (const sourceId of previousNodes.keys()) {
      if (!nextNodes.has(sourceId)) {
        operations.push({ type: RenderDiffOperationType.Remove, sourceId });
      }
    }

    return {
      operations,
      changed: operations.length > 0
    };
  }
}
