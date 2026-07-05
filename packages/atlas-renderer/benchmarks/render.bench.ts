import { DocumentRenderEngine } from '@atlas/atlas-renderer';
import { createTestDocument } from '../tests/fixtures/createTestDocument';

const engine = new DocumentRenderEngine();
const startedAt = Date.now();

for (let index = 0; index < 100; index += 1) {
  engine.createTree(createTestDocument());
}

const renderBenchmark = {
  count: 100,
  elapsedMs: Date.now() - startedAt
};

export { renderBenchmark };
