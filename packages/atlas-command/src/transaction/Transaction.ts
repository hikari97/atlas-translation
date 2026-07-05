import type { TransactionContext } from './TransactionContext';
import type { TransactionResult } from './TransactionResult';
import type { TransactionState } from './TransactionState';

/**
 * Atomic command execution scope.
 */
export interface Transaction {
  readonly context: TransactionContext;
  readonly state: TransactionState;
  begin(): TransactionResult;
  commit(): TransactionResult;
  rollback(): TransactionResult;
}
