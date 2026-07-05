import type { RuntimePipelineContext } from './RuntimePipelineContext';
import type { RuntimePipelineMetadata } from './RuntimePipelineMetadata';
import type { RuntimePipelineResult } from './RuntimePipelineResult';
import type { RuntimePipelineStage } from './RuntimePipelineStage';

export interface RuntimePipeline {
  readonly id: string;
  readonly name: string;
  readonly stages: readonly RuntimePipelineStage[];
  readonly metadata: RuntimePipelineMetadata;
  execute(context: RuntimePipelineContext): Promise<RuntimePipelineResult>;
}

export const createRuntimePipeline = (
  id: string,
  name: string,
  stages: readonly RuntimePipelineStage[],
  metadata: RuntimePipelineMetadata,
  execute: (context: RuntimePipelineContext) => Promise<RuntimePipelineResult>,
): RuntimePipeline => ({
  id,
  name,
  stages: [...stages].sort((left, right) => left.order - right.order),
  metadata,
  execute,
});
