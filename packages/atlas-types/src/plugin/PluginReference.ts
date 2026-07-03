import type { ID, Timestamp } from '../common';
import type { PluginType } from '../enums';

/**
 * Lightweight reference to a plugin.
 */
export interface PluginReference {
  readonly id: ID<'plugin'>;
  readonly name: string;
  readonly type: PluginType;
  readonly version: string;
  readonly enabled: boolean;
  readonly updatedAt: Timestamp;
}
