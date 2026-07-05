import type { ID, JsonValue } from '@atlas/atlas-types';
import type { SnapshotMetadata } from './SnapshotMetadata';

/**
 * Immutable representation of document state.
 */
export interface DocumentSnapshot<TData extends JsonValue = JsonValue> {
  readonly id: ID<'document-snapshot'>;
  readonly documentId: ID;
  readonly schemaVersion: string;
  readonly data: TData;
  readonly metadata: SnapshotMetadata;
}
