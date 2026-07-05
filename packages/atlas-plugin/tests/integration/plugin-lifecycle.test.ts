import { Environment } from '@atlas/atlas-core';
import { DefaultPluginContext, DefaultPluginManager, PluginBuilder } from '@atlas/atlas-plugin';

const calls: string[] = [];
const plugin = PluginBuilder.create('atlas.test.lifecycle')
  .name('Lifecycle')
  .version('1.0.0')
  .lifecycle({
    install: () => {
      calls.push('install');
    },
    initialize: () => {
      calls.push('initialize');
    },
    activate: () => {
      calls.push('activate');
    }
  })
  .build();

const manager = new DefaultPluginManager();
const context = new DefaultPluginContext({ environment: Environment.Test });
manager.register(plugin);

await manager.installAll(context);
await manager.initializeAll(context);
await manager.activateAll(context);

const lifecycleCalls: readonly string[] = calls;

export { lifecycleCalls };
