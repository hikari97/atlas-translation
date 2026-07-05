export type RuntimeContextLifecyclePhase = 'created' | 'active' | 'disposed';

export interface RuntimeContextLifecycle {
  readonly phase: RuntimeContextLifecyclePhase;
  readonly createdAt: Date;
  readonly disposedAt: Date | undefined;
  dispose(): void;
}

export class DefaultRuntimeContextLifecycle implements RuntimeContextLifecycle {
  private phaseValue: RuntimeContextLifecyclePhase = 'created';
  private disposedAtValue: Date | undefined = undefined;

  public constructor(public readonly createdAt: Date = new Date()) {}

  public get phase(): RuntimeContextLifecyclePhase {
    return this.phaseValue;
  }

  public get disposedAt(): Date | undefined {
    return this.disposedAtValue;
  }

  public activate(): void {
    if (this.phaseValue !== 'created') {
      throw new Error('Context lifecycle can only be activated from created state.');
    }
    this.phaseValue = 'active';
  }

  public dispose(): void {
    if (this.phaseValue === 'disposed') {
      throw new Error('Context lifecycle is already disposed.');
    }
    this.phaseValue = 'disposed';
    this.disposedAtValue = new Date();
  }
}

export const createRuntimeContextLifecycle = (createdAt: Date = new Date()): RuntimeContextLifecycle =>
  new DefaultRuntimeContextLifecycle(createdAt);
