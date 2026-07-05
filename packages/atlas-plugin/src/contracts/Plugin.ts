import type { PluginDescriptor } from './PluginDescriptor';
import type { PluginLifecycle } from './PluginLifecycle';

export interface Plugin extends PluginLifecycle {
  readonly descriptor: PluginDescriptor;
}
