import type { PluginIdentifier } from '../contracts';
import { PluginError } from './PluginError';

export class DuplicatePluginError extends PluginError {
  public constructor(pluginId: PluginIdentifier) {
    super(`Plugin is already registered: ${pluginId}`, pluginId);
    this.name = 'DuplicatePluginError';
  }
}
