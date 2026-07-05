import type { ID, Timestamp } from '@atlas/atlas-types';
import type { DocumentSnapshot } from '../snapshot';
import type { DiffContext } from './DiffContext';
import type { DiffOperation } from './DiffOperation';
import type { DiffResult } from './DiffResult';
import type { DocumentDiff } from './DocumentDiff';

/**
 * Deterministic snapshot differ for JSON-compatible snapshot payloads.
 */
export class DocumentDiffer {
  public compare(
    id: ID<'document-diff'>,
    fromSnapshot: DocumentSnapshot,
    toSnapshot: DocumentSnapshot,
    createdAt: Timestamp,
    _context: DiffContext
  ): DiffResult {
    const before = JSON.stringify(fromSnapshot.data);
    const after = JSON.stringify(toSnapshot.data);
    const operations: readonly DiffOperation[] =
      before === after
        ? []
        : [
            {
              type: 'update',
              path: '/',
              nodeId: toSnapshot.documentId,
              before: fromSnapshot.data,
              after: toSnapshot.data
            }
          ];

    const diff: DocumentDiff = {
      id,
      fromSnapshotId: fromSnapshot.id,
      toSnapshotId: toSnapshot.id,
      createdAt,
      operations
    };

    return {
      success: true,
      diff,
      errors: []
    };
  }
}
