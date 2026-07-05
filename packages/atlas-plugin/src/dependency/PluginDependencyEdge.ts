import type { PluginIdentifier } from '../contracts';

export interface PluginDependencyEdge {
  readonly from: PluginIdentifier;
  readonly to: PluginIdentifier;
  readonly optional: boolean;
}
