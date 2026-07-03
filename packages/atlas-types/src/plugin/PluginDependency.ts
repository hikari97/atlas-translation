import type { ID, Nullable } from '../common';

/**
 * Declared dependency on another plugin or Atlas capability.
 */
export interface PluginDependency {
  readonly id: ID<'plugin'>;
  readonly versionRange: string;
  readonly optional: boolean;
  readonly reason: Nullable<string>;
}
