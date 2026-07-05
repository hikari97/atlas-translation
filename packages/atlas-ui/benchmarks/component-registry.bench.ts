import { createButton, UIComponentRegistry } from '@atlas/atlas-ui';

const registry = new UIComponentRegistry();
const startedAt = Date.now();

for (let index = 0; index < 1000; index += 1) {
  registry.register(createButton(`atlas.ui.benchmark.button.${index}`, `Button ${index}`));
}

const componentRegistryBenchmark = {
  count: registry.list().length,
  elapsedMs: Date.now() - startedAt
};

export { componentRegistryBenchmark };
