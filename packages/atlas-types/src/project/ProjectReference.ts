import type { ID, Nullable, Timestamp } from '../common';
import type { ProjectStatus } from '../enums';

/**
 * Lightweight reference to a project.
 */
export interface ProjectReference {
  readonly id: ID<'project'>;
  readonly workspaceId: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly status: ProjectStatus;
  readonly updatedAt: Timestamp;
}
