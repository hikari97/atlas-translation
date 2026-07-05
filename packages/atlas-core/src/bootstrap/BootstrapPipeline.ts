import type { RuntimeContext } from '../context';
import type { BootstrapStep } from './BootstrapStep';

export class BootstrapPipeline {
  private readonly steps: BootstrapStep[] = [];

  public add(step: BootstrapStep): void {
    this.steps.push(step);
  }

  public async run(context: RuntimeContext): Promise<void> {
    for (const step of this.steps) {
      await step.run(context);
    }
  }
}
