import { DocumentRenderEngine, RenderPipeline } from '@atlas/atlas-renderer';
import { createTestDocument } from '../fixtures/createTestDocument';

const pipeline = new RenderPipeline();
const result = await pipeline.execute(new DocumentRenderEngine(), {
  document: createTestDocument(),
  runtime: null,
  options: {
    incremental: false,
    collectDiagnostics: false
  }
});

const pipelineHasTree: boolean = result.tree !== null;

export { pipelineHasTree };
