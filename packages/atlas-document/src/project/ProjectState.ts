import type { ProjectStatus } from '@atlas/atlas-types';

/**
 * Lifecycle state for a project document.
 */
export interface ProjectState {
  readonly status: ProjectStatus;
  readonly archived: boolean;
}
