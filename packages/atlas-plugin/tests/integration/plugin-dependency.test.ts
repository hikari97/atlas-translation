import { PluginBuilder, PluginDependencyGraph } from '@atlas/atlas-plugin';

const base = PluginBuilder.create('atlas.test.base').name('Base').version('1.0.0').build();
const feature = PluginBuilder.create('atlas.test.feature')
  .name('Feature')
  .version('1.0.0')
  .dependency({ id: base.descriptor.id })
  .build();

const graph = new PluginDependencyGraph();
graph.add(feature);
graph.add(base);

const orderedPluginNames: readonly string[] = graph.sort().map((plugin) => plugin.descriptor.name);

export { orderedPluginNames };
