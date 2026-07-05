import type { ID, Nullable } from '../common';
import type { WorkflowState as WorkflowStateKind } from '../enums';

/**
 * Named workflow state definition within a workflow lifecycle.
 */
export interface WorkflowStateDefinition {
  readonly id: ID<'workflow-state'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly value: WorkflowStateKind;
  readonly stageId: ID<'workflow-stage'>;
  readonly order: number;
  readonly isInitial: boolean;
  readonly isTerminal: boolean;
}
