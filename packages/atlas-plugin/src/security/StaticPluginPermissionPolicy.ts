import type { PluginIdentifier } from '../contracts';
import { PluginPermission } from './PluginPermission';
import type { PluginPermissionPolicy } from './PluginPermissionPolicy';

export class StaticPluginPermissionPolicy implements PluginPermissionPolicy {
  private readonly grants = new Map<PluginIdentifier, Set<PluginPermission>>();

  public grant(pluginId: PluginIdentifier, permission: PluginPermission): void {
    const permissions = this.grants.get(pluginId) ?? new Set<PluginPermission>();
    permissions.add(permission);
    this.grants.set(pluginId, permissions);
  }

  public grantAll(pluginId: PluginIdentifier): void {
    for (const permission of Object.values(PluginPermission)) {
      this.grant(pluginId, permission);
    }
  }

  public allows(pluginId: PluginIdentifier, permission: PluginPermission): boolean {
    return this.grants.get(pluginId)?.has(permission) ?? false;
  }
}
