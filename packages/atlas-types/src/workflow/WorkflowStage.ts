import type { ID, Nullable } from '../common';

/**
 * Ordered grouping of workflow states and processing steps.
 */
export interface WorkflowStage {
  readonly id: ID<'workflow-stage'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly order: number;
  readonly stateIds: readonly ID<'workflow-state'>[];
  readonly stepIds: readonly ID<'workflow-step'>[];
  readonly isInitial: boolean;
  readonly isTerminal: boolean;
}
