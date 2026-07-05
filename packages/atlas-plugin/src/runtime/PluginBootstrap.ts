import type { PluginDefinition } from '../contracts';
import type { PluginDiscovery } from '../discovery';
import type { PluginManager } from '../manager';

export class PluginBootstrap {
  public constructor(
    private readonly discovery: PluginDiscovery,
    private readonly manager: PluginManager
  ) {}

  public async bootstrap(): Promise<readonly PluginDefinition[]> {
    const plugins = await this.discovery.discover();
    for (const plugin of plugins) {
      this.manager.register(plugin);
    }
    return plugins;
  }
}
