import type { PluginIdentifier } from '../contracts';
import { PluginError } from './PluginError';

export class PluginNotFoundError extends PluginError {
  public constructor(pluginId: PluginIdentifier) {
    super(`Plugin is not registered: ${pluginId}`, pluginId);
    this.name = 'PluginNotFoundError';
  }
}
