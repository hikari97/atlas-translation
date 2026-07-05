import type { RuntimeCoreMetadata } from './RuntimeCoreMetadata';

export type RuntimeCorePhase = 'created' | 'initializing' | 'running' | 'stopping' | 'stopped';

export interface RuntimeCoreLifecycle {
  readonly phase: RuntimeCorePhase;
  readonly startedAt: Date | undefined;
  readonly stoppedAt: Date | undefined;
  start(): void;
  stop(): void;
}

export class DefaultRuntimeCoreLifecycle implements RuntimeCoreLifecycle {
  private phaseValue: RuntimeCorePhase = 'created';
  private startedAtValue: Date | undefined;
  private stoppedAtValue: Date | undefined;

  public constructor(private readonly metadata: RuntimeCoreMetadata) {}

  public get phase(): RuntimeCorePhase {
    return this.phaseValue;
  }

  public get startedAt(): Date | undefined {
    return this.startedAtValue;
  }

  public get stoppedAt(): Date | undefined {
    return this.stoppedAtValue;
  }

  public start(): void {
    if (this.phaseValue === 'running') {
      throw new Error(`Runtime core "${this.metadata.name}" is already running.`);
    }
    this.phaseValue = 'initializing';
    this.startedAtValue = new Date();
    this.phaseValue = 'running';
    this.stoppedAtValue = undefined;
  }

  public stop(): void {
    if (this.phaseValue !== 'running') {
      throw new Error(`Runtime core "${this.metadata.name}" is not running.`);
    }
    this.phaseValue = 'stopping';
    this.stoppedAtValue = new Date();
    this.phaseValue = 'stopped';
  }
}

export const createRuntimeCoreLifecycle = (metadata: RuntimeCoreMetadata): RuntimeCoreLifecycle =>
  new DefaultRuntimeCoreLifecycle(metadata);
