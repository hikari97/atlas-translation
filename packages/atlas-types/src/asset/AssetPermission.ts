import type { ID, Timestamp } from '../common';

/**
 * User permission assignment for an asset.
 */
export interface AssetPermission {
  readonly userId: ID<'user'>;
  readonly canRead: boolean;
  readonly canUpdate: boolean;
  readonly canDelete: boolean;
  readonly canShare: boolean;
  readonly grantedAt: Timestamp;
}
