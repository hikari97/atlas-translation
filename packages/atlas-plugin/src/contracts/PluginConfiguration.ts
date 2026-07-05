import type { JsonObject, JsonValue } from '@atlas/atlas-types';

export interface PluginConfigurationSchema {
  readonly defaults: JsonObject;
  readonly requiredKeys?: readonly string[] | undefined;
}

export interface PluginConfiguration {
  get(key: string): JsonValue | undefined;
  getAll(): JsonObject;
}
