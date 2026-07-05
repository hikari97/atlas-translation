import type { Plugin } from './Plugin';
import type { PluginConfigurationSchema } from './PluginConfiguration';
import type { PluginDescriptor } from './PluginDescriptor';
import type { PluginLifecycle } from './PluginLifecycle';

export interface PluginDefinition extends PluginLifecycle {
  readonly descriptor: PluginDescriptor;
  readonly configuration?: PluginConfigurationSchema | undefined;
  createPlugin?(): Plugin;
}
