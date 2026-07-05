import type { ID, JsonObject } from '@atlas/atlas-types';
import type { SnapshotOptions } from './SnapshotOptions';

/**
 * Context passed to snapshot factories.
 */
export interface SnapshotContext {
  readonly requestId: ID<'snapshot-request'>;
  readonly options: SnapshotOptions;
  readonly custom?: JsonObject;
}
