import { DefaultPluginRegistry, PluginBuilder } from '@atlas/atlas-plugin';

const registry = new DefaultPluginRegistry();
const startedAt = Date.now();

for (let index = 0; index < 1000; index += 1) {
  registry.register(PluginBuilder.create(`atlas.benchmark.registry.${index}`).name(`Registry ${index}`).version('1.0.0').build());
}

const registryBenchmark = {
  count: registry.getAll().length,
  elapsedMs: Date.now() - startedAt
};

export { registryBenchmark };
