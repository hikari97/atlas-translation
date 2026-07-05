import type { RenderDiffResult } from '../diff';
import { RenderDiffOperationType } from '../diff';
import type { RenderNode, RenderTree } from '../tree';
import type { RenderPatchResult } from './RenderPatchResult';

export class RenderPatchEngine {
  public apply(tree: RenderTree, diff: RenderDiffResult): RenderPatchResult {
    let root = tree.root;
    for (const operation of diff.operations) {
      if (operation.type === RenderDiffOperationType.Remove) {
        root = this.removeNode(root, operation.sourceId);
      }
      if ((operation.type === RenderDiffOperationType.Add || operation.type === RenderDiffOperationType.Update) && operation.node !== undefined) {
        root = this.upsertNode(root, operation.node);
      }
    }
    return {
      tree: {
        root,
        createdAt: tree.createdAt
      },
      applied: diff.operations.length
    };
  }

  private upsertNode(current: RenderNode, next: RenderNode): RenderNode {
    if (current.sourceId === next.sourceId) {
      return next;
    }
    const existingChild = current.children.some((child) => child.sourceId === next.sourceId);
    const children = existingChild
      ? current.children.map((child) => this.upsertNode(child, next))
      : current.children.map((child) => this.upsertNode(child, next));
    return { ...current, children };
  }

  private removeNode(current: RenderNode, sourceId: string): RenderNode {
    return {
      ...current,
      children: current.children
        .filter((child) => child.sourceId !== sourceId)
        .map((child) => this.removeNode(child, sourceId))
    };
  }
}
