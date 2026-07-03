declare const brandSymbol: unique symbol;

/**
 * Adds a compile-time brand to a primitive type.
 *
 * Use branded types when two values share the same runtime shape but should not
 * be interchangeable at compile time.
 */
export type Brand<TValue, TBrand extends string> = TValue & {
  readonly [brandSymbol]: TBrand;
};
