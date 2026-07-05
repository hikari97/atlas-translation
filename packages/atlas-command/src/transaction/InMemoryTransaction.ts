import type { Transaction } from './Transaction';
import type { TransactionContext } from './TransactionContext';
import type { TransactionResult } from './TransactionResult';
import { TransactionState } from './TransactionState';

/**
 * Minimal in-memory transaction state holder.
 */
export class InMemoryTransaction implements Transaction {
  private currentState = TransactionState.Pending;

  public constructor(public readonly context: TransactionContext) {}

  public get state(): TransactionState {
    return this.currentState;
  }

  public begin(): TransactionResult {
    this.currentState = TransactionState.Active;
    return { state: this.currentState, errors: [] };
  }

  public commit(): TransactionResult {
    this.currentState = TransactionState.Committed;
    return { state: this.currentState, errors: [] };
  }

  public rollback(): TransactionResult {
    this.currentState = TransactionState.RolledBack;
    return { state: this.currentState, errors: [] };
  }
}
