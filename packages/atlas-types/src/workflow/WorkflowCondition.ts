import type { ID, JsonObject, Nullable } from '../common';

/**
 * Declarative condition attached to workflow transitions or steps.
 */
export interface WorkflowCondition {
  readonly id: ID<'workflow-condition'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly expression: Nullable<string>;
  readonly metadata?: JsonObject;
}
