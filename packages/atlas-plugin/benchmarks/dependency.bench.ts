import { PluginBuilder, PluginDependencyGraph } from '@atlas/atlas-plugin';

const graph = new PluginDependencyGraph();
let previousId = PluginBuilder.create('atlas.benchmark.dependency.0').name('Dependency 0').version('1.0.0').build().descriptor.id;
graph.add(PluginBuilder.create('atlas.benchmark.dependency.0').name('Dependency 0').version('1.0.0').build());

for (let index = 1; index < 250; index += 1) {
  const plugin = PluginBuilder.create(`atlas.benchmark.dependency.${index}`)
    .name(`Dependency ${index}`)
    .version('1.0.0')
    .dependency({ id: previousId })
    .build();
  previousId = plugin.descriptor.id;
  graph.add(plugin);
}

const startedAt = Date.now();
const dependencyBenchmark = {
  count: graph.sort().length,
  elapsedMs: Date.now() - startedAt
};

export { dependencyBenchmark };
