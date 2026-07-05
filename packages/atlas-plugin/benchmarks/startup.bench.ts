import { Environment } from '@atlas/atlas-core';
import { DefaultPluginContext, DefaultPluginManager, PluginBuilder, PluginRuntime } from '@atlas/atlas-plugin';

const manager = new DefaultPluginManager();
for (let index = 0; index < 50; index += 1) {
  manager.register(PluginBuilder.create(`atlas.benchmark.startup.${index}`).name(`Startup ${index}`).version('1.0.0').build());
}

const runtime = new PluginRuntime(manager, new DefaultPluginContext({ environment: Environment.Test }));
const startedAt = Date.now();
await runtime.initialize();
await runtime.start();

const startupBenchmark = {
  count: manager.list().length,
  elapsedMs: Date.now() - startedAt
};

export { startupBenchmark };
