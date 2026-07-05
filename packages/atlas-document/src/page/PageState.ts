import type { WorkflowState } from '@atlas/atlas-types';

/**
 * Processing state for a page document.
 */
export interface PageState {
  readonly workflowState: WorkflowState;
  readonly processed: boolean;
}
