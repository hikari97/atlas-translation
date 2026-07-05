/**
 * Structured command error.
 */
export interface CommandError {
  readonly code: string;
  readonly message: string;
  readonly cause: string | null;
}
