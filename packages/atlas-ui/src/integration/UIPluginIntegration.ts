import { PluginBuilder, PluginCapability, type PluginDefinition } from '@atlas/atlas-plugin';

export class UIPluginIntegration {
  public createPlugin(): PluginDefinition {
    return PluginBuilder.create('atlas.ui')
      .name('Atlas UI')
      .version('0.1.0')
      .capabilities([PluginCapability.Renderer])
      .build();
  }
}
