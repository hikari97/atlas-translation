import type { ID, Nullable } from '../common';
import type { PluginType } from '../enums';
import type { PluginAuthor } from './PluginAuthor';
import type { PluginCapability } from './PluginCapability';
import type { PluginConfiguration } from './PluginConfiguration';
import type { PluginDependency } from './PluginDependency';
import type { PluginPermission } from './PluginPermission';
import type { PluginVersion } from './PluginVersion';

/**
 * Installable plugin manifest metadata.
 */
export interface PluginManifest {
  readonly id: ID<'plugin'>;
  readonly name: string;
  readonly displayName: string;
  readonly description: Nullable<string>;
  readonly type: PluginType;
  readonly entry: string;
  readonly version: PluginVersion;
  readonly author: PluginAuthor;
  readonly capabilities: readonly PluginCapability[];
  readonly dependencies: readonly PluginDependency[];
  readonly permissions: readonly PluginPermission[];
  readonly configuration: PluginConfiguration;
}
