import type { ID, Nullable, Timestamp } from '../common';
import type { WorkflowState as WorkflowStateKind } from '../enums';

/**
 * Lightweight reference to an entity's workflow progression.
 */
export interface WorkflowHistoryReference {
  readonly id: ID<'workflow-history'>;
  readonly workflowId: ID<'workflow'>;
  readonly entityId: ID;
  readonly entityType: string;
  readonly fromState: Nullable<WorkflowStateKind>;
  readonly toState: WorkflowStateKind;
  readonly transitionId: Nullable<ID<'workflow-transition'>>;
  readonly changedAt: Timestamp;
}
