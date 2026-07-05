import type { RouteMetadata } from './metadata';
import type { RouterLifecycleRecord } from './shared';

export type RouteLifecycleState = 'created' | 'registered' | 'enabled' | 'disabled' | 'deprecated' | 'removed';

export interface RouteLifecycleTransition {
  readonly from: RouteLifecycleState;
  readonly to: RouteLifecycleState;
  readonly at: Date;
}

export interface RouteLifecycleEvent {
  readonly state: RouteLifecycleState;
  readonly transition: RouteLifecycleTransition;
  readonly metadata: RouteLifecycleMetadata;
}

export interface RouteLifecycleMetadata extends RouteMetadata {}

export interface RouteLifecycle {
  readonly state: RouteLifecycleState;
  readonly metadata: RouteLifecycleMetadata;
  readonly record: RouterLifecycleRecord<RouteLifecycleState>;
  transition(state: RouteLifecycleState): void;
  transitions(): readonly RouteLifecycleTransition[];
  events(): readonly RouteLifecycleEvent[];
}

export class DefaultRouteLifecycle implements RouteLifecycle {
  private currentState: RouteLifecycleState;

  private readonly history: RouteLifecycleTransition[] = [];

  private readonly eventHistory: RouteLifecycleEvent[] = [];

  public readonly metadata: RouteLifecycleMetadata;

  public readonly record: RouterLifecycleRecord<RouteLifecycleState>;

  public constructor(metadata: RouteLifecycleMetadata, initialState: RouteLifecycleState = 'created', now: Date = new Date()) {
    this.currentState = initialState;
    this.metadata = metadata;
    this.record = {
      state: initialState,
      transitions: [initialState],
      createdAt: now,
      updatedAt: now,
    };
  }

  public get state(): RouteLifecycleState {
    return this.currentState;
  }

  public transition(state: RouteLifecycleState): void {
    const transition = { from: this.currentState, to: state, at: new Date() };
    this.history.push(transition);
    this.eventHistory.push({ state, transition, metadata: this.metadata });
    this.currentState = state;
  }

  public transitions(): readonly RouteLifecycleTransition[] {
    return [...this.history];
  }

  public events(): readonly RouteLifecycleEvent[] {
    return [...this.eventHistory];
  }
}
