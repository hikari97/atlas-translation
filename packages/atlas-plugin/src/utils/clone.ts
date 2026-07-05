import type { JsonObject, JsonValue } from '@atlas/atlas-types';

export function cloneJsonObject(value: JsonObject): JsonObject {
  const entries = Object.entries(value).map(([key, item]): readonly [string, JsonValue] => {
    if (Array.isArray(item)) {
      return [key, item.slice()] as const;
    }
    if (item !== null && typeof item === 'object') {
      return [key, cloneJsonObject(item as JsonObject)] as const;
    }
    return [key, item] as const;
  });
  return Object.fromEntries(entries) as JsonObject;
}
