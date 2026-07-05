import type { CommandError } from '../result';
import type { TransactionState } from './TransactionState';

/**
 * Result returned by transaction operations.
 */
export interface TransactionResult {
  readonly state: TransactionState;
  readonly errors: readonly CommandError[];
}
