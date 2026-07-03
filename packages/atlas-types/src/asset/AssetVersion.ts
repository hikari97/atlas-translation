import type { ID, Nullable, Timestamp } from '../common';
import type { AssetChecksum } from './AssetChecksum';

/**
 * Version metadata for an asset revision.
 */
export interface AssetVersion {
  readonly id: ID<'asset-version'>;
  readonly version: string;
  readonly createdAt: Timestamp;
  readonly createdBy: ID<'user'>;
  readonly checksum: AssetChecksum;
  readonly note: Nullable<string>;
}
