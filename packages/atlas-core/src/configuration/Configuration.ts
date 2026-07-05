import type { JsonValue } from '@atlas/atlas-types';

export class Configuration {
  private readonly values = new Map<string, JsonValue>();

  public set(key: string, value: JsonValue): void {
    this.values.set(key, value);
  }

  public get(key: string): JsonValue | undefined {
    return this.values.get(key);
  }
}
