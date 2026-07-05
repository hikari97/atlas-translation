import type { JsonObject } from '@atlas/atlas-types';

/**
 * Options used when creating document snapshots.
 */
export interface SnapshotOptions {
  readonly includeMetadata: boolean;
  readonly freeze: boolean;
  readonly custom?: JsonObject;
}
