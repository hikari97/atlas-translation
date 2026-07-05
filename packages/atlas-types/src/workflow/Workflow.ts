import type { ID, Nullable } from '../common';
import type { WorkflowState as WorkflowStateKind } from '../enums';
import type { WorkflowCondition } from './WorkflowCondition';
import type { WorkflowMetadata } from './WorkflowMetadata';
import type { WorkflowStage } from './WorkflowStage';
import type { WorkflowStateDefinition } from './WorkflowState';
import type { WorkflowStep } from './WorkflowStep';
import type { WorkflowTransition } from './WorkflowTransition';

/**
 * Reusable lifecycle definition for an Atlas entity type.
 */
export interface Workflow {
  readonly id: ID<'workflow'>;
  readonly workspaceId?: ID<'workspace'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly entityType: string;
  readonly state: WorkflowStateKind;
  readonly initialStateId: ID<'workflow-state'>;
  readonly stages: readonly WorkflowStage[];
  readonly states: readonly WorkflowStateDefinition[];
  readonly transitions: readonly WorkflowTransition[];
  readonly steps: readonly WorkflowStep[];
  readonly conditions: readonly WorkflowCondition[];
  readonly metadata: WorkflowMetadata;
}
