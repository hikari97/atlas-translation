import type { RequestMetadata } from './metadata';
import type { RequestLifecycleRecord } from './shared';

export type RequestLifecycleState =
  | 'created'
  | 'initialized'
  | 'middleware'
  | 'validation'
  | 'authorization'
  | 'controller'
  | 'completed'
  | 'cancelled'
  | 'failed';

export interface RequestLifecycleTransition {
  readonly from: RequestLifecycleState;
  readonly to: RequestLifecycleState;
  readonly at: Date;
}

export interface RequestLifecycleMetadata extends RequestMetadata {}

export interface RequestLifecycleEvent {
  readonly state: RequestLifecycleState;
  readonly transition: RequestLifecycleTransition;
  readonly metadata: RequestLifecycleMetadata;
}

export interface RequestLifecycle {
  readonly state: RequestLifecycleState;
  readonly metadata: RequestLifecycleMetadata;
  readonly record: RequestLifecycleRecord<RequestLifecycleState>;
  transition(state: RequestLifecycleState): void;
  transitions(): readonly RequestLifecycleTransition[];
  events(): readonly RequestLifecycleEvent[];
}

export class DefaultRequestLifecycle implements RequestLifecycle {
  private currentState: RequestLifecycleState;

  private readonly history: RequestLifecycleTransition[] = [];

  private readonly eventHistory: RequestLifecycleEvent[] = [];

  public readonly record: RequestLifecycleRecord<RequestLifecycleState>;

  public constructor(
    public readonly metadata: RequestLifecycleMetadata,
    initialState: RequestLifecycleState = 'created',
    now: Date = new Date(),
  ) {
    this.currentState = initialState;
    this.record = {
      state: initialState,
      transitions: [initialState],
      createdAt: now,
      updatedAt: now,
    };
  }

  public get state(): RequestLifecycleState {
    return this.currentState;
  }

  public transition(state: RequestLifecycleState): void {
    const transition = { from: this.currentState, to: state, at: new Date() };
    this.history.push(transition);
    this.eventHistory.push({ state, transition, metadata: this.metadata });
    this.currentState = state;
  }

  public transitions(): readonly RequestLifecycleTransition[] {
    return [...this.history];
  }

  public events(): readonly RequestLifecycleEvent[] {
    return [...this.eventHistory];
  }
}
