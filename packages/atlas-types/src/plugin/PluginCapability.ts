import type { JsonObject, Nullable } from '../common';
import type { PluginType } from '../enums';

/**
 * Capability advertised by a plugin.
 */
export interface PluginCapability {
  readonly type: PluginType;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly metadata?: JsonObject;
}
