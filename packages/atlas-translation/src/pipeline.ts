import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { TranslationError, TranslationItem, TranslationResult } from './foundation';

export type TranslationPipelineId = ID<'translation-pipeline'>;
export type PipelineStageId = ID<'translation-pipeline-stage'>;
export type TranslationJobId = ID<'translation-job'>;

export enum PipelineState {
  Ready = 'ready',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled'
}

export interface PipelineContext {
  readonly item: TranslationItem;
  readonly data: JsonObject;
  readonly startedAt: Timestamp;
}

export interface PipelineStageResult {
  readonly stageId: PipelineStageId;
  readonly state: PipelineState;
  readonly data: JsonObject;
  readonly errors: readonly TranslationError[];
}

export interface PipelineStage {
  readonly id: PipelineStageId;
  readonly name: string;
  execute(context: PipelineContext): Promise<PipelineStageResult>;
}

export interface PipelineNode {
  readonly id: ID<'translation-pipeline-node'>;
  readonly stage: PipelineStage;
  readonly nextNodeIds: readonly ID<'translation-pipeline-node'>[];
  readonly metadata: JsonObject;
}

export interface PipelineSnapshot {
  readonly pipelineId: TranslationPipelineId;
  readonly state: PipelineState;
  readonly completedStages: readonly PipelineStageId[];
  readonly failedStage: PipelineStageId | null;
  readonly capturedAt: Timestamp;
}

export interface PipelineResult {
  readonly pipelineId: TranslationPipelineId;
  readonly state: PipelineState;
  readonly stageResults: readonly PipelineStageResult[];
  readonly result: TranslationResult | null;
}

export interface TranslationPipeline {
  readonly id: TranslationPipelineId;
  readonly stages: readonly PipelineStage[];
}

export interface TranslationJob {
  readonly id: TranslationJobId;
  readonly item: TranslationItem;
  readonly pipeline: TranslationPipeline;
  readonly priority: number;
  readonly metadata: JsonObject;
}

export interface PipelineEvent {
  readonly type: string;
  readonly pipelineId: TranslationPipelineId;
  readonly stageId: PipelineStageId | null;
  readonly metadata: JsonObject;
  readonly occurredAt: Timestamp;
}

export class PipelineExecutor {
  public async execute(pipeline: TranslationPipeline, context: PipelineContext): Promise<PipelineResult> {
    const stageResults: PipelineStageResult[] = [];
    let state = PipelineState.Completed;

    for (const stage of pipeline.stages) {
      const result = await stage.execute(context);
      stageResults.push(result);
      if (result.state === PipelineState.Failed || result.state === PipelineState.Cancelled) {
        state = result.state;
        break;
      }
    }

    return { pipelineId: pipeline.id, state, stageResults, result: null };
  }

  public snapshot(pipeline: TranslationPipeline, result: PipelineResult): PipelineSnapshot {
    const failed = result.stageResults.find((stageResult) => stageResult.state === PipelineState.Failed);
    return {
      pipelineId: pipeline.id,
      state: result.state,
      completedStages: result.stageResults.filter((stageResult) => stageResult.state === PipelineState.Completed).map((stageResult) => stageResult.stageId),
      failedStage: failed?.stageId ?? null,
      capturedAt: new Date().toISOString() as Timestamp
    };
  }
}

export function createPipeline(id: TranslationPipelineId, stages: readonly PipelineStage[]): TranslationPipeline {
  return { id, stages: [...stages] };
}
