/**
 * Transaction lifecycle state.
 */
export enum TransactionState {
  Pending = 'pending',
  Active = 'active',
  Committed = 'committed',
  RolledBack = 'rolled-back',
  Failed = 'failed'
}
