import type { DocumentSnapshot } from './DocumentSnapshot';

/**
 * Result returned by snapshot creation.
 */
export interface SnapshotResult<TSnapshot extends DocumentSnapshot = DocumentSnapshot> {
  readonly success: boolean;
  readonly snapshot: TSnapshot | null;
  readonly errors: readonly string[];
}
