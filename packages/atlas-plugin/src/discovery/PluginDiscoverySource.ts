import type { PluginDefinition } from '../contracts';

export interface PluginDiscoverySource {
  discover(): readonly PluginDefinition[] | Promise<readonly PluginDefinition[]>;
}
