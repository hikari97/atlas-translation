import type { ValidationFailure } from './ValidationFailure';

/**
 * Aggregated validation result.
 */
export interface ValidationResult {
  readonly valid: boolean;
  readonly failures: readonly ValidationFailure[];
}
