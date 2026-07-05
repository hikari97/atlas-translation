import type { ID, Nullable, Timestamp } from '../common';
import type { WorkflowState as WorkflowStateKind } from '../enums';

/**
 * Lightweight reference to a workflow definition.
 */
export interface WorkflowReference {
  readonly id: ID<'workflow'>;
  readonly workspaceId?: ID<'workspace'>;
  readonly name: string;
  readonly entityType: string;
  readonly state: WorkflowStateKind;
  readonly version: Nullable<string>;
  readonly updatedAt: Timestamp;
}
