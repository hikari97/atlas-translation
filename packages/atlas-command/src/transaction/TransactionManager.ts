import type { Transaction } from './Transaction';
import type { TransactionContext } from './TransactionContext';

/**
 * Creates transaction scopes.
 */
export interface TransactionManager {
  begin(context: TransactionContext): Transaction;
}
