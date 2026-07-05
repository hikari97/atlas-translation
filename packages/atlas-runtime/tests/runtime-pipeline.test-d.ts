import {
  createRuntimeHook,
  createRuntimePipeline,
  type RuntimePipeline,
  type RuntimePipelineContext,
  type RuntimePipelineResult,
  type RuntimePipelineStage,
} from '../src';

const pipelineHook = createRuntimeHook(
  'pipeline-hook',
  'before.runtime.start',
  'normal',
  {
    name: 'Pipeline Hook',
    description: undefined,
    attributes: {},
  },
  async () => undefined,
);

const stage: RuntimePipelineStage = {
  id: 'stage-1',
  name: 'Stage One',
  order: 1,
  hooks: [pipelineHook],
  attributes: {},
};

const pipelineContext: RuntimePipelineContext = {
  event: undefined,
  attributes: {
    source: 'test',
  },
};

const pipeline: RuntimePipeline = createRuntimePipeline(
  'pipeline-1',
  'Startup Pipeline',
  [stage],
  {
    description: 'Startup pipeline.',
    attributes: {},
  },
  async (): Promise<RuntimePipelineResult> => ({
    completed: true,
    events: [],
    attributes: {},
  }),
);

pipeline.id.toUpperCase();
pipeline.name.toUpperCase();
pipeline.stages[0]?.hooks[0]?.id.toUpperCase();
const pipelineResult = await pipeline.execute(pipelineContext);
pipelineResult.completed.valueOf();
