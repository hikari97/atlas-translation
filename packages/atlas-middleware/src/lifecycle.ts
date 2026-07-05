import type { MiddlewareAttributes } from './shared';

export type MiddlewareLifecycleState =
  | 'created'
  | 'registered'
  | 'resolving'
  | 'resolved'
  | 'building'
  | 'ready'
  | 'executing'
  | 'completed'
  | 'short-circuited'
  | 'failed'
  | 'disposed';

export interface MiddlewareLifecycleTransition {
  readonly from: MiddlewareLifecycleState;
  readonly to: MiddlewareLifecycleState;
  readonly at: Date;
  readonly attributes: MiddlewareAttributes;
}

export interface MiddlewareLifecycleEvent {
  readonly state: MiddlewareLifecycleState;
  readonly at: Date;
  readonly attributes: MiddlewareAttributes;
}

export interface MiddlewareLifecycleMetadata {
  readonly attributes: MiddlewareAttributes;
}

export interface MiddlewareLifecycle {
  readonly metadata: MiddlewareLifecycleMetadata;
  state(): MiddlewareLifecycleState;
  transition(to: MiddlewareLifecycleState, attributes?: MiddlewareAttributes): MiddlewareLifecycleTransition;
  transitions(): readonly MiddlewareLifecycleTransition[];
  events(): readonly MiddlewareLifecycleEvent[];
}

export class DefaultMiddlewareLifecycle implements MiddlewareLifecycle {
  private current: MiddlewareLifecycleState = 'created';

  private readonly records: MiddlewareLifecycleTransition[] = [];

  public constructor(public readonly metadata: MiddlewareLifecycleMetadata = { attributes: {} }) {}

  public state(): MiddlewareLifecycleState {
    return this.current;
  }

  public transition(to: MiddlewareLifecycleState, attributes: MiddlewareAttributes = {}): MiddlewareLifecycleTransition {
    const record = {
      from: this.current,
      to,
      at: new Date(),
      attributes,
    };
    this.current = to;
    this.records.push(record);
    return record;
  }

  public transitions(): readonly MiddlewareLifecycleTransition[] {
    return [...this.records];
  }

  public events(): readonly MiddlewareLifecycleEvent[] {
    return this.records.map((record) => ({
      state: record.to,
      at: record.at,
      attributes: record.attributes,
    }));
  }
}
