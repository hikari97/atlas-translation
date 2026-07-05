import { DefaultPluginManager, PluginBuilder } from '@atlas/atlas-plugin';

const pluginManager = new DefaultPluginManager();
pluginManager.register(PluginBuilder.create('atlas.example.first').name('First Plugin').version('1.0.0').build());
pluginManager.register(PluginBuilder.create('atlas.example.second').name('Second Plugin').version('1.0.0').build());

export { pluginManager };
