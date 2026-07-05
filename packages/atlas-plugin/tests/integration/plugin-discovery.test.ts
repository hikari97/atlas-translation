import { PluginBuilder, PluginDiscovery, StaticPluginDiscoverySource } from '@atlas/atlas-plugin';

const plugin = PluginBuilder.create('atlas.test.discovery').name('Discovery').version('1.0.0').build();
const discovery = new PluginDiscovery([new StaticPluginDiscoverySource([plugin])]);
const discoveredPlugins = await discovery.discover();

const discoveredCount: number = discoveredPlugins.length;

export { discoveredCount };
