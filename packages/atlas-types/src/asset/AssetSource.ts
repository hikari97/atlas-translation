import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Origin metadata for an asset.
 */
export interface AssetSource {
  readonly type: 'imported' | 'generated' | 'embedded' | 'linked' | 'system';
  readonly providerId: Nullable<ID<'plugin'>>;
  readonly originalUri: Nullable<string>;
  readonly importedAt?: Timestamp;
  readonly metadata?: JsonObject;
}
