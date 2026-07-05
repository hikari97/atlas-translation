import { DefaultPluginManager, PluginBuilder } from '@atlas/atlas-plugin';

const manager = new DefaultPluginManager();
manager.register(PluginBuilder.create('atlas.test.one').name('One').version('1.0.0').build());
manager.register(PluginBuilder.create('atlas.test.two').name('Two').version('1.0.0').build());

const pluginCount: number = manager.list().length;

export { pluginCount };
