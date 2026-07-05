import type { ID, JsonValue } from '@atlas/atlas-types';
import type { DocumentSnapshot } from './DocumentSnapshot';
import type { SnapshotContext } from './SnapshotContext';
import type { SnapshotMetadata } from './SnapshotMetadata';
import type { SnapshotResult } from './SnapshotResult';

/**
 * Creates immutable snapshots from JSON-compatible document data.
 */
export class SnapshotFactory {
  public create<TData extends JsonValue>(
    id: ID<'document-snapshot'>,
    documentId: ID,
    schemaVersion: string,
    data: TData,
    metadata: SnapshotMetadata,
    context: SnapshotContext
  ): SnapshotResult<DocumentSnapshot<TData>> {
    const snapshot: DocumentSnapshot<TData> = {
      id,
      documentId,
      schemaVersion,
      data: context.options.freeze ? Object.freeze(data) : data,
      metadata
    };

    return {
      success: true,
      snapshot,
      errors: []
    };
  }
}
