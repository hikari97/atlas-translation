import type { JsonObject } from '../common';

/**
 * Declarative configuration defaults and schema metadata for a plugin.
 */
export interface PluginConfiguration {
  readonly defaults: JsonObject;
  readonly schema?: JsonObject;
  readonly secrets: readonly string[];
}
