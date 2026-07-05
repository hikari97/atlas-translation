import type { JsonObject, JsonValue } from '@atlas/atlas-types';
import type { PluginConfiguration } from '../contracts';
import { cloneJsonObject } from '../utils/clone';

export class DefaultPluginConfiguration implements PluginConfiguration {
  private readonly values: JsonObject;

  public constructor(defaults: JsonObject = {}) {
    this.values = cloneJsonObject(defaults);
  }

  public get(key: string): JsonValue | undefined {
    return this.values[key];
  }

  public getAll(): JsonObject {
    return cloneJsonObject(this.values);
  }
}
