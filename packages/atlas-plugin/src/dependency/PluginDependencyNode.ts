import type { PluginDefinition, PluginIdentifier } from '../contracts';

export interface PluginDependencyNode {
  readonly id: PluginIdentifier;
  readonly plugin: PluginDefinition;
}
