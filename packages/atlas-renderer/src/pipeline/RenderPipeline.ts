import type { RenderContext, RenderResult } from '../contracts';
import type { RenderEngine } from '../engine';

export interface RenderPipelineStep {
  run(context: RenderContext): RenderContext | Promise<RenderContext>;
}

export class RenderPipeline {
  private readonly steps: RenderPipelineStep[] = [];

  public use(step: RenderPipelineStep): void {
    this.steps.push(step);
  }

  public async execute(engine: RenderEngine, context: RenderContext): Promise<RenderResult> {
    let currentContext = context;
    for (const step of this.steps) {
      currentContext = await step.run(currentContext);
    }
    return engine.render(currentContext);
  }
}
