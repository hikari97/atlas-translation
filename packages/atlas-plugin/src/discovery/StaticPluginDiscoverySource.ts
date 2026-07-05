import type { PluginDefinition } from '../contracts';
import type { PluginDiscoverySource } from './PluginDiscoverySource';

export class StaticPluginDiscoverySource implements PluginDiscoverySource {
  public constructor(private readonly plugins: readonly PluginDefinition[]) {}

  public discover(): readonly PluginDefinition[] {
    return this.plugins.slice();
  }
}
