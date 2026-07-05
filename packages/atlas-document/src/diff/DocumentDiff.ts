import type { ID, Timestamp } from '@atlas/atlas-types';
import type { DiffOperation } from './DiffOperation';

/**
 * Structured change set between two snapshots.
 */
export interface DocumentDiff {
  readonly id: ID<'document-diff'>;
  readonly fromSnapshotId: ID<'document-snapshot'>;
  readonly toSnapshotId: ID<'document-snapshot'>;
  readonly createdAt: Timestamp;
  readonly operations: readonly DiffOperation[];
}
