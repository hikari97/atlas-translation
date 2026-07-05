import type { WorkflowState } from '@atlas/atlas-types';

/**
 * Lifecycle state for the Atlas document aggregate.
 */
export interface AtlasDocumentState {
  readonly workflowState: WorkflowState;
  readonly readonly: boolean;
}
