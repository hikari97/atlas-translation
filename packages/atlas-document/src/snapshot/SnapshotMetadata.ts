import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

/**
 * Metadata attached to an immutable document snapshot.
 */
export interface SnapshotMetadata {
  readonly createdBy: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly label: string | null;
  readonly custom?: JsonObject;
}
