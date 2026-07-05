import {
  DefaultTransactionManager,
  TransactionState
} from '@atlas/atlas-command';
import type { ID, Timestamp } from '@atlas/atlas-types';

const transaction = new DefaultTransactionManager().begin({
  id: 'transaction-1' as ID<'transaction'>,
  startedAt: '2026-07-03T00:00:00.000Z' as Timestamp
});

export const transactionResult = {
  active: transaction.state === TransactionState.Active,
  committed: transaction.commit()
};
