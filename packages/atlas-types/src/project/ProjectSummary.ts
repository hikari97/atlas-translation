import type { ID, Nullable, Timestamp } from '../common';
import type { ProjectStatus } from '../enums';

/**
 * Compact project data for workspace listings and navigation.
 */
export interface ProjectSummary {
  readonly id: ID<'project'>;
  readonly workspaceId: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly status: ProjectStatus;
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly pageCount: number;
  readonly updatedAt: Timestamp;
  readonly thumbnailPageId?: ID<'page'>;
}
