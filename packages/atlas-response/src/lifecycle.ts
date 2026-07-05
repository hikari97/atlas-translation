import type { ResponseMetadata } from './metadata';
import type { ResponseLifecycleRecord } from './shared';

export type ResponseLifecycleState =
  | 'created'
  | 'initialized'
  | 'building'
  | 'serializing'
  | 'compressing'
  | 'ready'
  | 'sending'
  | 'sent'
  | 'cancelled'
  | 'failed';

export interface ResponseLifecycleTransition {
  readonly from: ResponseLifecycleState;
  readonly to: ResponseLifecycleState;
  readonly at: Date;
}

export interface ResponseLifecycleMetadata extends ResponseMetadata {}

export interface ResponseLifecycleEvent {
  readonly state: ResponseLifecycleState;
  readonly transition: ResponseLifecycleTransition;
  readonly metadata: ResponseLifecycleMetadata;
}

export interface ResponseLifecycle {
  readonly state: ResponseLifecycleState;
  readonly metadata: ResponseLifecycleMetadata;
  readonly record: ResponseLifecycleRecord<ResponseLifecycleState>;
  transition(state: ResponseLifecycleState): void;
  transitions(): readonly ResponseLifecycleTransition[];
  events(): readonly ResponseLifecycleEvent[];
}

export class DefaultResponseLifecycle implements ResponseLifecycle {
  private currentState: ResponseLifecycleState;

  private readonly history: ResponseLifecycleTransition[] = [];

  private readonly eventHistory: ResponseLifecycleEvent[] = [];

  public readonly record: ResponseLifecycleRecord<ResponseLifecycleState>;

  public constructor(
    public readonly metadata: ResponseLifecycleMetadata,
    initialState: ResponseLifecycleState = 'created',
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

  public get state(): ResponseLifecycleState {
    return this.currentState;
  }

  public transition(state: ResponseLifecycleState): void {
    const transition = { from: this.currentState, to: state, at: new Date() };
    this.history.push(transition);
    this.eventHistory.push({ state, transition, metadata: this.metadata });
    this.currentState = state;
  }

  public transitions(): readonly ResponseLifecycleTransition[] {
    return [...this.history];
  }

  public events(): readonly ResponseLifecycleEvent[] {
    return [...this.eventHistory];
  }
}
