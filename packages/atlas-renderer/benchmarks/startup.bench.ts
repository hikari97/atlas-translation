import { RendererRuntime } from '@atlas/atlas-renderer';
import { createTestDocument } from '../tests/fixtures/createTestDocument';

const startedAt = Date.now();
const runtime = new RendererRuntime();
runtime.render(createTestDocument());

const startupBenchmark = {
  count: 1,
  elapsedMs: Date.now() - startedAt
};

export { startupBenchmark };
