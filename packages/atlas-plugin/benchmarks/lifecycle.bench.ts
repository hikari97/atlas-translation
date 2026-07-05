import { Environment } from '@atlas/atlas-core';
import { DefaultPluginContext, DefaultPluginManager, PluginBuilder } from '@atlas/atlas-plugin';

const manager = new DefaultPluginManager();
for (let index = 0; index < 100; index += 1) {
  manager.register(PluginBuilder.create(`atlas.benchmark.lifecycle.${index}`).name(`Lifecycle ${index}`).version('1.0.0').build());
}

const startedAt = Date.now();
await manager.installAll(new DefaultPluginContext({ environment: Environment.Test }));

const lifecycleBenchmark = {
  count: manager.list().length,
  elapsedMs: Date.now() - startedAt
};

export { lifecycleBenchmark };
