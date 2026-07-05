import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Runtime transaction context.
 */
export interface TransactionContext {
  readonly id: ID<'transaction'>;
  readonly startedAt: Timestamp;
  readonly metadata?: JsonObject;
}
