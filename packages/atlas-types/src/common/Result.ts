/**
 * Successful operation result.
 */
export type Success<TValue> = {
  readonly ok: true;
  readonly value: TValue;
};

/**
 * Failed operation result.
 */
export type Failure<TError = Error> = {
  readonly ok: false;
  readonly error: TError;
};

/**
 * Discriminated union for operations that may succeed or fail.
 */
export type Result<TValue, TError = Error> =
  | Success<TValue>
  | Failure<TError>;
