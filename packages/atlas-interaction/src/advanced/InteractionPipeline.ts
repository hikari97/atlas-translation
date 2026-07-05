import type { InteractionState } from '../foundation';

export type InteractionPipelineStep = (state: InteractionState) => InteractionState;

export class InteractionPipeline {
  private readonly steps: InteractionPipelineStep[] = [];

  public use(step: InteractionPipelineStep): void {
    this.steps.push(step);
  }

  public run(state: InteractionState): InteractionState {
    return this.steps.reduce((current, step) => step(current), state);
  }
}
