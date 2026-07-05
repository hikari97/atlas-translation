import type { ID, Timestamp } from '@atlas/atlas-types';

/**
 * Internal collection change record.
 */
export interface CollectionEvent {
  readonly type: 'add' | 'remove' | 'clear';
  readonly documentId: ID | null;
  readonly occurredAt: Timestamp;
}
