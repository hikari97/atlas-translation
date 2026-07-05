import type { ControllerAttributes } from './shared';

export type ControllerLifecycleState =
  | 'created'
  | 'registered'
  | 'resolving'
  | 'resolved'
  | 'dispatching'
  | 'executing'
  | 'completed'
  | 'failed'
  | 'disposed';

export interface ControllerLifecycleTransition {
  readonly from: ControllerLifecycleState;
  readonly to: ControllerLifecycleState;
  readonly at: Date;
  readonly attributes: ControllerAttributes;
}

export interface ControllerLifecycleEvent {
  readonly state: ControllerLifecycleState;
  readonly at: Date;
  readonly attributes: ControllerAttributes;
}

export interface ControllerLifecycleMetadata {
  readonly attributes: ControllerAttributes;
}

export interface ControllerLifecycle {
  readonly metadata: ControllerLifecycleMetadata;
  state(): ControllerLifecycleState;
  transition(to: ControllerLifecycleState, attributes?: ControllerAttributes): ControllerLifecycleTransition;
  transitions(): readonly ControllerLifecycleTransition[];
  events(): readonly ControllerLifecycleEvent[];
}

export class DefaultControllerLifecycle implements ControllerLifecycle {
  private current: ControllerLifecycleState = 'created';

  private readonly records: ControllerLifecycleTransition[] = [];

  public constructor(public readonly metadata: ControllerLifecycleMetadata = { attributes: {} }) {}

  public state(): ControllerLifecycleState {
    return this.current;
  }

  public transition(to: ControllerLifecycleState, attributes: ControllerAttributes = {}): ControllerLifecycleTransition {
    const record = { from: this.current, to, at: new Date(), attributes };
    this.current = to;
    this.records.push(record);
    return record;
  }

  public transitions(): readonly ControllerLifecycleTransition[] {
    return [...this.records];
  }

  public events(): readonly ControllerLifecycleEvent[] {
    return this.records.map((record) => ({
      state: record.to,
      at: record.at,
      attributes: record.attributes,
    }));
  }
}
