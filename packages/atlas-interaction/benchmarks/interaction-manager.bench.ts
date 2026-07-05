import { InteractionManager, InteractionType } from '@atlas/atlas-interaction';
import type { ID } from '@atlas/atlas-types';

const manager = new InteractionManager();
const startedAt = Date.now();

for (let index = 0; index < 1000; index += 1) {
  manager.start(`interaction-${index}` as ID<'interaction'>, InteractionType.Pointer);
}

const interactionManagerBenchmark = {
  count: manager.list().length,
  elapsedMs: Date.now() - startedAt
};

export { interactionManagerBenchmark };
