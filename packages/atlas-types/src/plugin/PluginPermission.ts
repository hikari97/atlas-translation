import type { Nullable } from '../common';

/**
 * Permission requested by a plugin.
 */
export interface PluginPermission {
  readonly name: string;
  readonly description: Nullable<string>;
  readonly required: boolean;
}
