import { PluginBuilder, PluginDiscovery, StaticPluginDiscoverySource } from '@atlas/atlas-plugin';

const plugins = Array.from({ length: 250 }, (_, index) =>
  PluginBuilder.create(`atlas.benchmark.discovery.${index}`).name(`Discovery ${index}`).version('1.0.0').build()
);

const startedAt = Date.now();
const discovered = await new PluginDiscovery([new StaticPluginDiscoverySource(plugins)]).discover();

const discoveryBenchmark = {
  count: discovered.length,
  elapsedMs: Date.now() - startedAt
};

export { discoveryBenchmark };
