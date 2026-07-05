import type { ID, JsonObject, Nullable } from '../common';
import type { PluginReference } from '../plugin';

/**
 * Declarative processing step associated with a workflow.
 */
export interface WorkflowStep {
  readonly id: ID<'workflow-step'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly stageId: ID<'workflow-stage'>;
  readonly order: number;
  readonly plugin: Nullable<PluginReference>;
  readonly dependsOnStepIds: readonly ID<'workflow-step'>[];
  readonly conditionIds: readonly ID<'workflow-condition'>[];
  readonly metadata?: JsonObject;
}
