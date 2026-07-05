import type { RuntimeContext } from '../context';
import { LifecycleState } from '../lifecycle';
import type { ModuleRegistry } from '../module';

export class RuntimeKernel {
  private currentState = LifecycleState.Created;

  public constructor(private readonly modules: ModuleRegistry) {}

  public get state(): LifecycleState {
    return this.currentState;
  }

  public async start(context: RuntimeContext): Promise<void> {
    this.currentState = LifecycleState.Starting;
    for (const module of this.modules.list()) {
      await module.start(context);
    }
    this.currentState = LifecycleState.Ready;
  }

  public async stop(context: RuntimeContext): Promise<void> {
    this.currentState = LifecycleState.Stopping;
    for (const module of this.modules.list().slice().reverse()) {
      await module.stop(context);
    }
    this.currentState = LifecycleState.Stopped;
  }
}
