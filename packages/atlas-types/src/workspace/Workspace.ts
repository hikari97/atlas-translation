import type { ID, Nullable } from '../common';
import type { WorkspaceStatus } from '../enums';
import type { WorkspaceMetadata } from './WorkspaceMetadata';
import type { WorkspacePermission } from './WorkspacePermission';
import type { WorkspaceSettings } from './WorkspaceSettings';
import type { WorkspaceStatistics } from './WorkspaceStatistics';

/**
 * Root container for Atlas Studio projects, assets, settings, and shared resources.
 */
export interface Workspace {
  readonly id: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly status: WorkspaceStatus;
  readonly metadata: WorkspaceMetadata;
  readonly settings: WorkspaceSettings;
  readonly statistics: WorkspaceStatistics;
  readonly permissions: readonly WorkspacePermission[];
  readonly projectIds: readonly ID<'project'>[];
  readonly assetIds: readonly ID<'asset'>[];
}
