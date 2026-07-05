import type { ValidationAttributes } from './shared';

export type ValidationLifecycleState =
  | 'created'
  | 'registered'
  | 'resolving'
  | 'resolved'
  | 'executing'
  | 'completed'
  | 'failed'
  | 'disposed';

export interface ValidationLifecycleTransition {
  readonly from: ValidationLifecycleState;
  readonly to: ValidationLifecycleState;
  readonly at: Date;
  readonly attributes: ValidationAttributes;
}

export interface ValidationLifecycleEvent {
  readonly state: ValidationLifecycleState;
  readonly at: Date;
  readonly attributes: ValidationAttributes;
}

export interface ValidationLifecycleMetadata {
  readonly attributes: ValidationAttributes;
}

export interface ValidationLifecycle {
  readonly metadata: ValidationLifecycleMetadata;
  state(): ValidationLifecycleState;
  transition(to: ValidationLifecycleState, attributes?: ValidationAttributes): ValidationLifecycleTransition;
  transitions(): readonly ValidationLifecycleTransition[];
  events(): readonly ValidationLifecycleEvent[];
}

export class DefaultValidationLifecycle implements ValidationLifecycle {
  private current: ValidationLifecycleState = 'created';

  private readonly records: ValidationLifecycleTransition[] = [];

  public constructor(public readonly metadata: ValidationLifecycleMetadata = { attributes: {} }) {}

  public state(): ValidationLifecycleState {
    return this.current;
  }

  public transition(to: ValidationLifecycleState, attributes: ValidationAttributes = {}): ValidationLifecycleTransition {
    const record = { from: this.current, to, at: new Date(), attributes };
    this.current = to;
    this.records.push(record);
    return record;
  }

  public transitions(): readonly ValidationLifecycleTransition[] {
    return [...this.records];
  }

  public events(): readonly ValidationLifecycleEvent[] {
    return this.records.map((record) => ({ state: record.to, at: record.at, attributes: record.attributes }));
  }
}
