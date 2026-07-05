import { CommandResultStatus, type CommandResult } from '../result';
import type { TransactionCoordinator } from './TransactionCoordinator';
import type { TransactionContext } from './TransactionContext';
import type { TransactionManager } from './TransactionManager';

/**
 * Transaction manager-backed coordinator.
 */
export class DefaultTransactionCoordinator implements TransactionCoordinator {
  public constructor(private readonly transactions: TransactionManager) {}

  public async execute<TResult>(
    context: TransactionContext,
    operation: () => Promise<CommandResult<TResult>>
  ): Promise<CommandResult<TResult>> {
    const transaction = this.transactions.begin(context);
    const result = await operation();

    if (result.status === CommandResultStatus.Success) {
      transaction.commit();
      return result;
    }

    transaction.rollback();
    return result;
  }
}
