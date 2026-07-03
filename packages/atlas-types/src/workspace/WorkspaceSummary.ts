import type { ID, Nullable, Timestamp } from '../common';
import type { WorkspaceStatus } from '../enums';

/**
 * Compact workspace data for listings and navigation.
 */
export interface WorkspaceSummary {
  readonly id: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly status: WorkspaceStatus;
  readonly projectCount: number;
  readonly updatedAt: Timestamp;
  readonly thumbnailAssetId?: ID<'asset'>;
}
