import type { CommandResult } from '../result';
import type { TransactionContext } from './TransactionContext';

/**
 * Coordinates transaction lifecycle around an operation.
 */
export interface TransactionCoordinator {
  execute<TResult>(
    context: TransactionContext,
    operation: () => Promise<CommandResult<TResult>>
  ): Promise<CommandResult<TResult>>;
}
