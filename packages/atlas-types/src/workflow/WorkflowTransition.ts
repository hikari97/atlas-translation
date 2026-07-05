import type { ID, JsonObject, Nullable } from '../common';

/**
 * Allowed movement between two workflow states.
 */
export interface WorkflowTransition {
  readonly id: ID<'workflow-transition'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly fromStateId: ID<'workflow-state'>;
  readonly toStateId: ID<'workflow-state'>;
  readonly conditionIds: readonly ID<'workflow-condition'>[];
  readonly stepIds: readonly ID<'workflow-step'>[];
  readonly metadata?: JsonObject;
}
