import type { RenderNode, RenderTree } from '../tree';
import { RenderTreeTraverser } from '../tree';

export interface RendererDiagnosticReport {
  readonly nodeCount: number;
  readonly maxDepth: number;
  readonly generatedAt: string;
}

export class RendererDiagnostics {
  public report(tree: RenderTree): RendererDiagnosticReport {
    const traverser = new RenderTreeTraverser();
    return {
      nodeCount: traverser.flatten(tree).length,
      maxDepth: this.depth(tree.root),
      generatedAt: new Date().toISOString()
    };
  }

  private depth(node: RenderNode): number {
    if (node.children.length === 0) {
      return 1;
    }
    return 1 + Math.max(...node.children.map((child) => this.depth(child)));
  }
}
