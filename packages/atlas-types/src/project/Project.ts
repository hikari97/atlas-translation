import type { ID, Nullable } from '../common';
import type { ProjectStatus } from '../enums';
import type { ProjectExportSettings } from './ProjectExportSettings';
import type { ProjectMetadata } from './ProjectMetadata';
import type { ProjectSettings } from './ProjectSettings';
import type { ProjectStatistics } from './ProjectStatistics';

/**
 * Translation project contained by a workspace.
 */
export interface Project {
  readonly id: ID<'project'>;
  readonly workspaceId: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly status: ProjectStatus;
  readonly metadata: ProjectMetadata;
  readonly settings: ProjectSettings;
  readonly statistics: ProjectStatistics;
  readonly exportSettings: ProjectExportSettings;
  readonly pageIds: readonly ID<'page'>[];
  readonly assetIds: readonly ID<'asset'>[];
  readonly glossaryIds: readonly ID<'glossary'>[];
  readonly characterIds: readonly ID<'character'>[];
}
