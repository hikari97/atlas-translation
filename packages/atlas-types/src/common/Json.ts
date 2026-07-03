/**
 * Primitive values allowed in JSON documents.
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * JSON object value with readonly properties.
 */
export type JsonObject = {
  readonly [key: string]: JsonValue;
};

/**
 * JSON array value.
 */
export type JsonArray = readonly JsonValue[];

/**
 * Any value that can be represented in JSON.
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
