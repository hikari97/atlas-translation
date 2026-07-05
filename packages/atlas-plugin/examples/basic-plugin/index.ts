import { PluginBuilder } from '@atlas/atlas-plugin';

const basicPlugin = PluginBuilder.create('atlas.example.basic')
  .name('Basic Plugin')
  .version('1.0.0')
  .description('Minimal Atlas plugin.')
  .build();

export { basicPlugin };
