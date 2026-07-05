export type RuntimeModuleLifecycleState = 'created' | 'registered' | 'initialized' | 'disposed';

export interface RuntimeModuleLifecycle {
  readonly state: RuntimeModuleLifecycleState;
  readonly registeredAt: Date | undefined;
  readonly initializedAt: Date | undefined;
  readonly disposedAt: Date | undefined;
  register(): void;
  initialize(): void;
  dispose(): void;
}

export class DefaultRuntimeModuleLifecycle implements RuntimeModuleLifecycle {
  private stateValue: RuntimeModuleLifecycleState = 'created';
  private registeredAtValue: Date | undefined;
  private initializedAtValue: Date | undefined;
  private disposedAtValue: Date | undefined;

  public get state(): RuntimeModuleLifecycleState {
    return this.stateValue;
  }

  public get registeredAt(): Date | undefined {
    return this.registeredAtValue;
  }

  public get initializedAt(): Date | undefined {
    return this.initializedAtValue;
  }

  public get disposedAt(): Date | undefined {
    return this.disposedAtValue;
  }

  public register(): void {
    if (this.stateValue !== 'created') {
      throw new Error('Module can only be registered from created state.');
    }
    this.stateValue = 'registered';
    this.registeredAtValue = new Date();
  }

  public initialize(): void {
    if (this.stateValue !== 'registered') {
      throw new Error('Module can only be initialized from registered state.');
    }
    this.stateValue = 'initialized';
    this.initializedAtValue = new Date();
  }

  public dispose(): void {
    if (this.stateValue === 'disposed') {
      throw new Error('Module is already disposed.');
    }
    this.stateValue = 'disposed';
    this.disposedAtValue = new Date();
  }
}

export const createRuntimeModuleLifecycle = (): RuntimeModuleLifecycle => new DefaultRuntimeModuleLifecycle();
