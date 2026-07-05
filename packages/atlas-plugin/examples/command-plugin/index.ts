import type { Timestamp } from '@atlas/atlas-types';
import type { CommandId, CommandName } from '@atlas/atlas-command';
import { PluginBuilder, type PluginContext } from '@atlas/atlas-plugin';

const commandPlugin = PluginBuilder.create('atlas.example.command')
  .name('Command Plugin')
  .version('1.0.0')
  .lifecycle({
    activate: async (context: PluginContext) => {
      await context.execute({
        id: 'example-command' as CommandId,
        name: 'atlas.example.command' as CommandName,
        payload: {},
        createdAt: new Date().toISOString() as Timestamp
      });
    }
  })
  .build();

export { commandPlugin };
