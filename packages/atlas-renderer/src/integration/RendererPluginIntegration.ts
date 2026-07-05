import { PluginBuilder, PluginCapability, type PluginDefinition } from '@atlas/atlas-plugin';

export class RendererPluginIntegration {
  public createPlugin(): PluginDefinition {
    return PluginBuilder.create('atlas.renderer')
      .name('Atlas Renderer')
      .version('0.1.0')
      .capabilities([PluginCapability.Renderer])
      .build();
  }
}
