import type { PluginContext, PluginDefinition, PluginIdentifier } from '../contracts';

export interface PluginManager {
  register(plugin: PluginDefinition): void;
  unregister(id: PluginIdentifier): boolean;
  list(): readonly PluginDefinition[];
  installAll(context: PluginContext): Promise<void>;
  initializeAll(context: PluginContext): Promise<void>;
  activateAll(context: PluginContext): Promise<void>;
  deactivateAll(context: PluginContext): Promise<void>;
  disposeAll(context: PluginContext): Promise<void>;
}
