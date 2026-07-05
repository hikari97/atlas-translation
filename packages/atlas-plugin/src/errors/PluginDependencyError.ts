import type { PluginIdentifier } from '../contracts';
import { PluginError } from './PluginError';

export class PluginDependencyError extends PluginError {
  public constructor(message: string, pluginId?: PluginIdentifier) {
    super(message, pluginId);
    this.name = 'PluginDependencyError';
  }
}
