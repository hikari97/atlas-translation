type BuiltInValue =
  | Date
  | Error
  | RegExp
  | ((...arguments_: unknown[]) => unknown);

/**
 * Recursively marks every property in a value as readonly.
 */
export type DeepReadonly<TValue> = TValue extends BuiltInValue
  ? TValue
  : TValue extends readonly (infer TItem)[]
    ? readonly DeepReadonly<TItem>[]
    : TValue extends object
      ? { readonly [TKey in keyof TValue]: DeepReadonly<TValue[TKey]> }
      : TValue;
