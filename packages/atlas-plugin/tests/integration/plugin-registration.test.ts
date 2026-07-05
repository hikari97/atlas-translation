import { DefaultPluginRegistry, PluginBuilder } from '@atlas/atlas-plugin';

const plugin = PluginBuilder.create('atlas.test.registration').name('Registration').version('1.0.0').build();
const registry = new DefaultPluginRegistry();

registry.register(plugin);

const registeredPlugin = registry.get(plugin.descriptor.id);
const hasRegisteredPlugin: boolean = registeredPlugin?.descriptor.id === plugin.descriptor.id;

export { hasRegisteredPlugin };
