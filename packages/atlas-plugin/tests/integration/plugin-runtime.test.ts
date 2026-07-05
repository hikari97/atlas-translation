import { Environment } from '@atlas/atlas-core';
import {
  DefaultPluginContext,
  DefaultPluginManager,
  PluginBuilder,
  PluginRuntime
} from '@atlas/atlas-plugin';

const plugin = PluginBuilder.create('atlas.test.runtime').name('Runtime').version('1.0.0').build();
const manager = new DefaultPluginManager();
manager.register(plugin);

const runtime = new PluginRuntime(manager, new DefaultPluginContext({ environment: Environment.Test }));

await runtime.initialize();
await runtime.start();
await runtime.stop();
await runtime.dispose();

const runtimeVerified = true;

export { runtimeVerified };
