import type { Nullable } from '../common';

/**
 * Plugin author metadata.
 */
export interface PluginAuthor {
  readonly name: string;
  readonly email: Nullable<string>;
  readonly url: Nullable<string>;
}
