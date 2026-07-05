import type { RuntimeLifecycleHook } from './RuntimeLifecycleHook';
import type { RuntimeLifecycleMetadata } from './RuntimeLifecycleMetadata';
import type { RuntimeLifecyclePhase } from './RuntimeLifecyclePhase';
import type { RuntimeLifecycleState } from './RuntimeLifecycleState';

export interface RuntimeLifecycle {
  readonly state: RuntimeLifecycleState;
  readonly phase: RuntimeLifecyclePhase;
  readonly metadata: RuntimeLifecycleMetadata;
  readonly hooks: readonly RuntimeLifecycleHook[];
}

export class DefaultRuntimeLifecycle implements RuntimeLifecycle {
  private stateValue: RuntimeLifecycleState = 'idle';
  private phaseValue: RuntimeLifecyclePhase = 'created';
  private startedAtValue: Date | undefined;
  private stoppedAtValue: Date | undefined;
  private readonly hookValues: RuntimeLifecycleHook[] = [];

  public get state(): RuntimeLifecycleState {
    return this.stateValue;
  }

  public get phase(): RuntimeLifecyclePhase {
    return this.phaseValue;
  }

  public get metadata(): RuntimeLifecycleMetadata {
    return {
      startedAt: this.startedAtValue,
      stoppedAt: this.stoppedAtValue,
      attributes: {},
    };
  }

  public get hooks(): readonly RuntimeLifecycleHook[] {
    return this.hookValues;
  }

  public register(hook: RuntimeLifecycleHook): void {
    this.hookValues.push(hook);
  }

  public initialize(): void {
    this.phaseValue = 'initializing';
    this.stateValue = 'active';
    this.phaseValue = 'configured';
  }

  public start(): void {
    this.phaseValue = 'starting';
    this.startedAtValue = new Date();
    this.stateValue = 'active';
    this.phaseValue = 'running';
  }

  public stop(): void {
    this.phaseValue = 'stopping';
    this.stoppedAtValue = new Date();
    this.stateValue = 'terminated';
    this.phaseValue = 'stopped';
  }
}

export const createRuntimeLifecycle = (): RuntimeLifecycle => new DefaultRuntimeLifecycle();
