import { DocumentRenderEngine, RenderDiffEngine } from '@atlas/atlas-renderer';
import { createTestDocument } from '../tests/fixtures/createTestDocument';

const engine = new DocumentRenderEngine();
const previous = engine.createTree(createTestDocument());
const next = engine.createTree(createTestDocument());
const startedAt = Date.now();

for (let index = 0; index < 100; index += 1) {
  new RenderDiffEngine().diff(previous, next);
}

const diffBenchmark = {
  count: 100,
  elapsedMs: Date.now() - startedAt
};

export { diffBenchmark };
