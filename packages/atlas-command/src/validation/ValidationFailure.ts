/**
 * One validation failure.
 */
export interface ValidationFailure {
  readonly code: string;
  readonly message: string;
  readonly path: string | null;
}
