import type { HttpContext } from './context';
import type { HttpMetadata } from './metadata';
import type { HttpLifecycleRecord, HttpMutableRegistry } from './shared';
import { InMemoryHttpRegistry } from './shared';

export type HttpPipelineStageExecutor = (context: HttpContext) => Promise<void>;

export interface HttpPipelineStage {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly execute: HttpPipelineStageExecutor;
}

export interface HttpPipelineMetadata extends HttpMetadata {}

export type HttpPipelineLifecycleState = 'initialized' | 'executing' | 'complete' | 'disposed';

export interface HttpPipelineLifecycle extends HttpLifecycleRecord<HttpPipelineLifecycleState> {}

export interface HttpPipelineRegistry extends HttpMutableRegistry<HttpPipelineStage> {}

export interface HttpPipeline {
  readonly registry: HttpPipelineRegistry;
  readonly lifecycle: HttpPipelineLifecycle;
  readonly metadata: HttpPipelineMetadata;
}

export const createHttpPipeline = (
  metadata: HttpPipelineMetadata,
  registry: HttpPipelineRegistry = new InMemoryHttpRegistry<HttpPipelineStage>(),
  now: Date = new Date(),
): HttpPipeline => ({
  registry,
  metadata,
  lifecycle: {
    state: 'initialized',
    transitions: ['initialized'],
    createdAt: now,
    updatedAt: now,
  },
});

export const getOrderedHttpPipelineStages = (pipeline: HttpPipeline): readonly HttpPipelineStage[] =>
  pipeline
    .registry
    .entries()
    .map((entry) => entry.value)
    .sort((left, right) => left.order - right.order);

export const reorderHttpPipelineStage = (
  pipeline: HttpPipeline,
  stageId: string,
  order: number,
): HttpPipelineStage | undefined => {
  const stage = pipeline.registry.get(stageId);
  if (stage === undefined) {
    return undefined;
  }

  const reordered: HttpPipelineStage = {
    ...stage,
    order,
  };
  pipeline.registry.register({
    id: reordered.id,
    name: reordered.name,
    value: reordered,
  });
  return reordered;
};

export const executeHttpPipelineStage = async (
  stage: HttpPipelineStage,
  context: HttpContext,
): Promise<void> => {
  await stage.execute(context);
};

export const executeHttpPipeline = async (
  pipeline: HttpPipeline,
  context: HttpContext,
): Promise<void> => {
  const stages = getOrderedHttpPipelineStages(pipeline);
  for (const stage of stages) {
    await executeHttpPipelineStage(stage, context);
  }
};
