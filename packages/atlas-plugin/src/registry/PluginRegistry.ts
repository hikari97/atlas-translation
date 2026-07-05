import type { PluginDefinition, PluginIdentifier } from '../contracts';

export interface PluginRegistry {
  register(plugin: PluginDefinition): void;
  unregister(id: PluginIdentifier): boolean;
  has(id: PluginIdentifier): boolean;
  get(id: PluginIdentifier): PluginDefinition | undefined;
  getAll(): readonly PluginDefinition[];
  clear(): void;
}
