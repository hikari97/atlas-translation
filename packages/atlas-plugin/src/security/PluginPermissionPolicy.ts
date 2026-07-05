import type { PluginIdentifier } from '../contracts';
import type { PluginPermission } from './PluginPermission';

export interface PluginPermissionPolicy {
  allows(pluginId: PluginIdentifier, permission: PluginPermission): boolean;
}
