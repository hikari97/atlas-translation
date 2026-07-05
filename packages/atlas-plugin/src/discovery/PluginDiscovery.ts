import type { PluginDefinition } from '../contracts';
import type { PluginDiscoverySource } from './PluginDiscoverySource';

export class PluginDiscovery {
  public constructor(private readonly sources: readonly PluginDiscoverySource[]) {}

  public async discover(): Promise<readonly PluginDefinition[]> {
    const discovered: PluginDefinition[] = [];
    for (const source of this.sources) {
      discovered.push(...(await source.discover()));
    }
    return discovered;
  }
}
