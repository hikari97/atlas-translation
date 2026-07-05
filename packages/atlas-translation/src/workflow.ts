import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { TranslationBatch } from './batch';
import type { TranslationWorkflowId } from './foundation';

export type WorkflowStepId = ID<'translation-workflow-step'>;

export enum WorkflowStepStatus {
  Ready = 'ready',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed',
  Skipped = 'skipped'
}

export interface WorkflowCondition {
  readonly id: ID<'translation-workflow-condition'>;
  evaluate(context: JsonObject): boolean;
}

export interface WorkflowStep {
  readonly id: WorkflowStepId;
  readonly name: string;
  readonly metadata: JsonObject;
}

export interface WorkflowTransition {
  readonly from: WorkflowStepId;
  readonly to: WorkflowStepId;
  readonly conditionId: string | null;
}

export interface TranslationWorkflow {
  readonly id: TranslationWorkflowId;
  readonly name: string;
  readonly steps: readonly WorkflowStep[];
  readonly transitions: readonly WorkflowTransition[];
  readonly metadata: JsonObject;
}

export interface WorkflowTemplate {
  readonly id: ID<'translation-workflow-template'>;
  readonly workflow: TranslationWorkflow;
  readonly metadata: JsonObject;
}

export interface WorkflowSnapshot {
  readonly workflowId: TranslationWorkflowId;
  readonly completedSteps: readonly WorkflowStepId[];
  readonly capturedAt: Timestamp;
}

export interface WorkflowProgress {
  readonly totalSteps: number;
  readonly completedSteps: number;
  readonly failedSteps: number;
}

export interface WorkflowHistory {
  readonly workflowId: TranslationWorkflowId;
  readonly snapshots: readonly WorkflowSnapshot[];
}

export class WorkflowExecutor {
  public execute(workflow: TranslationWorkflow, batch: TranslationBatch): WorkflowSnapshot {
    return {
      workflowId: workflow.id,
      completedSteps: workflow.steps.map((step) => step.id),
      capturedAt: new Date().toISOString() as Timestamp
    };
  }
}

export class WorkflowValidator {
  public validate(workflow: TranslationWorkflow): readonly string[] {
    return workflow.steps.length === 0 ? ['Workflow must contain at least one step.'] : [];
  }
}

export interface WorkflowEvent {
  readonly type: string;
  readonly workflowId: TranslationWorkflowId;
  readonly metadata: JsonObject;
  readonly occurredAt: Timestamp;
}
