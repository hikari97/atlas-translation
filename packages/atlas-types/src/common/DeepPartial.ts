type BuiltInValue =
  | Date
  | Error
  | RegExp
  | ((...arguments_: unknown[]) => unknown);

/**
 * Recursively marks every property in a value as optional.
 */
export type DeepPartial<TValue> = TValue extends BuiltInValue
  ? TValue
  : TValue extends readonly (infer TItem)[]
    ? readonly DeepPartial<TItem>[]
    : TValue extends object
      ? { [TKey in keyof TValue]?: DeepPartial<TValue[TKey]> }
      : TValue;
