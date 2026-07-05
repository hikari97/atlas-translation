export type RuntimeServiceLifecycleState = 'created' | 'active' | 'suspended' | 'disposed';

export interface RuntimeServiceLifecycle {
  readonly state: RuntimeServiceLifecycleState;
  readonly createdAt: Date;
  readonly disposedAt: Date | undefined;
  activate(): void;
  suspend(): void;
  dispose(): void;
}

export class DefaultRuntimeServiceLifecycle implements RuntimeServiceLifecycle {
  private stateValue: RuntimeServiceLifecycleState = 'created';
  private disposedAtValue: Date | undefined;

  public constructor(public readonly createdAt: Date = new Date()) {}

  public get state(): RuntimeServiceLifecycleState {
    return this.stateValue;
  }

  public get disposedAt(): Date | undefined {
    return this.disposedAtValue;
  }

  public activate(): void {
    if (this.stateValue === 'disposed') {
      throw new Error('Cannot activate a disposed service.');
    }
    this.stateValue = 'active';
  }

  public suspend(): void {
    if (this.stateValue !== 'active') {
      throw new Error('Can only suspend an active service.');
    }
    this.stateValue = 'suspended';
  }

  public dispose(): void {
    if (this.stateValue === 'disposed') {
      throw new Error('Service is already disposed.');
    }
    this.stateValue = 'disposed';
    this.disposedAtValue = new Date();
  }
}

export const createRuntimeServiceLifecycle = (createdAt: Date = new Date()): RuntimeServiceLifecycle =>
  new DefaultRuntimeServiceLifecycle(createdAt);
