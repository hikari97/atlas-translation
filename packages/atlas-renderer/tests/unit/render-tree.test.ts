import { DocumentRenderEngine, RenderTreeTraverser } from '@atlas/atlas-renderer';
import { createTestDocument } from '../fixtures/createTestDocument';

const engine = new DocumentRenderEngine();
const result = engine.render({
  document: createTestDocument(),
  runtime: null,
  options: {
    incremental: false,
    collectDiagnostics: true
  }
});

const tree = result.tree;
const nodeCount: number = tree === null ? 0 : new RenderTreeTraverser().flatten(tree).length;

export { nodeCount };
