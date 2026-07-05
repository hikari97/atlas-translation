import type { RuntimeContext } from '../context';
import type { RuntimeKernel } from '../kernel';

export class Application {
  public constructor(
    public readonly name: string,
    private readonly kernel: RuntimeKernel,
    private readonly context: RuntimeContext
  ) {}

  public start(): Promise<void> {
    return this.kernel.start(this.context);
  }

  public stop(): Promise<void> {
    return this.kernel.stop(this.context);
  }
}
