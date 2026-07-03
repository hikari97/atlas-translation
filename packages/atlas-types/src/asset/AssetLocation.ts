import type { Nullable } from '../common';

/**
 * Resource location metadata for an asset.
 */
export interface AssetLocation {
  readonly uri: string;
  readonly path: Nullable<string>;
  readonly storageProvider: Nullable<string>;
  readonly isRemote: boolean;
  readonly isEmbedded: boolean;
}
