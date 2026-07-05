import type { HttpMetadata } from './metadata';
import type { HttpLifecycleRecord } from './shared';

export type HttpLifecycleState =
  | 'created'
  | 'initialized'
  | 'receiving'
  | 'processing'
  | 'executing'
  | 'responding'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'disposed';

export interface HttpLifecycleTransition {
  readonly from: HttpLifecycleState;
  readonly to: HttpLifecycleState;
  readonly at: Date;
}

export interface HttpLifecycleEvent {
  readonly state: HttpLifecycleState;
  readonly transition: HttpLifecycleTransition;
  readonly metadata: HttpMetadata;
}

export interface HttpLifecycleMetadata extends HttpMetadata {}

export interface HttpLifecycle {
  readonly state: HttpLifecycleState;
  readonly metadata: HttpLifecycleMetadata;
  readonly record: HttpLifecycleRecord<HttpLifecycleState>;
  transition(state: HttpLifecycleState): void;
  transitions(): readonly HttpLifecycleTransition[];
  events(): readonly HttpLifecycleEvent[];
}

export class DefaultHttpLifecycle implements HttpLifecycle {
  private currentState: HttpLifecycleState;

  private readonly history: HttpLifecycleTransition[] = [];

  private readonly eventHistory: HttpLifecycleEvent[] = [];

  public readonly metadata: HttpLifecycleMetadata;

  public readonly record: HttpLifecycleRecord<HttpLifecycleState>;

  public constructor(metadata: HttpLifecycleMetadata, initialState: HttpLifecycleState = 'created', now: Date = new Date()) {
    this.currentState = initialState;
    this.metadata = metadata;
    this.record = {
      state: initialState,
      transitions: [initialState],
      createdAt: now,
      updatedAt: now,
    };
  }

  public get state(): HttpLifecycleState {
    return this.currentState;
  }

  public transition(state: HttpLifecycleState): void {
    const at = new Date();
    const transition = { from: this.currentState, to: state, at };
    this.history.push(transition);
    this.eventHistory.push({ state, transition, metadata: this.metadata });
    this.currentState = state;
  }

  public transitions(): readonly HttpLifecycleTransition[] {
    return [...this.history];
  }

  public events(): readonly HttpLifecycleEvent[] {
    return [...this.eventHistory];
  }
}
