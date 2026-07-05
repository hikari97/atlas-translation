import type { RenderNode } from './RenderNode';
import type { RenderTree } from './RenderTree';

export class RenderTreeTraverser {
  public visit(tree: RenderTree, visitor: (node: RenderNode) => void): void {
    this.visitNode(tree.root, visitor);
  }

  public flatten(tree: RenderTree): readonly RenderNode[] {
    const nodes: RenderNode[] = [];
    this.visit(tree, (node) => nodes.push(node));
    return nodes;
  }

  public find(tree: RenderTree, sourceId: string): RenderNode | undefined {
    return this.flatten(tree).find((node) => node.sourceId === sourceId);
  }

  private visitNode(node: RenderNode, visitor: (node: RenderNode) => void): void {
    visitor(node);
    for (const child of node.children) {
      this.visitNode(child, visitor);
    }
  }
}
