import type { ID, JsonObject, Nullable, Timestamp } from '../common';
import type { AssetTag } from './AssetTag';

/**
 * Descriptive and audit metadata for an asset.
 */
export interface AssetMetadata {
  readonly createdBy: ID<'user'>;
  readonly updatedBy?: ID<'user'>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly title: Nullable<string>;
  readonly description: Nullable<string>;
  readonly tags: readonly AssetTag[];
  readonly custom?: JsonObject;
}
