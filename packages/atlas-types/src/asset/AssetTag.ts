import type { ID, Nullable } from '../common';

/**
 * Label assigned to an asset for organization and filtering.
 */
export interface AssetTag {
  readonly id: ID<'asset-tag'>;
  readonly name: string;
  readonly color: Nullable<string>;
}
