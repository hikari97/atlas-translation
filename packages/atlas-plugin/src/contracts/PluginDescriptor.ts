import type { PluginCapability } from './PluginCapability';
import type { PluginDependency } from './PluginDependency';
import type { PluginIdentifier } from './PluginIdentifier';
import type { PluginMetadata } from './PluginMetadata';

export interface PluginDescriptor {
  readonly id: PluginIdentifier;
  readonly name: string;
  readonly metadata: PluginMetadata;
  readonly dependencies?: readonly PluginDependency[] | undefined;
  readonly capabilities?: readonly PluginCapability[] | undefined;
  readonly tags?: readonly string[] | undefined;
}
