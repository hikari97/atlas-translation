import type { PluginIdentifier } from './PluginIdentifier';

export interface PluginDependency {
  readonly id: PluginIdentifier;
  readonly versionRange?: string | undefined;
  readonly optional?: boolean | undefined;
}
