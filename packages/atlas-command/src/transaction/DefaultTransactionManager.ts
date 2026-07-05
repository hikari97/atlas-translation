import type { Transaction } from './Transaction';
import type { TransactionContext } from './TransactionContext';
import type { TransactionManager } from './TransactionManager';
import { InMemoryTransaction } from './InMemoryTransaction';

/**
 * Creates in-memory transactions.
 */
export class DefaultTransactionManager implements TransactionManager {
  public begin(context: TransactionContext): Transaction {
    const transaction = new InMemoryTransaction(context);
    transaction.begin();
    return transaction;
  }
}
