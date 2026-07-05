import type { AuthenticationAttributes } from './shared';

export type AuthenticationLifecycleState =
  | 'unauthenticated'
  | 'created'
  | 'registered'
  | 'resolving'
  | 'resolved'
  | 'authenticating'
  | 'authenticated'
  | 'active'
  | 'expired'
  | 'revoked'
  | 'invalidated'
  | 'failed'
  | 'disposed';

export interface AuthenticationLifecycleTransition {
  readonly from: AuthenticationLifecycleState;
  readonly to: AuthenticationLifecycleState;
  readonly at: Date;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationLifecycleEvent {
  readonly state: AuthenticationLifecycleState;
  readonly at: Date;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationLifecycleMetadata {
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationLifecycle {
  readonly state: AuthenticationLifecycleState;
  readonly metadata: AuthenticationLifecycleMetadata;
  transition(to: AuthenticationLifecycleState, attributes?: AuthenticationAttributes): void;
  transitions(): readonly AuthenticationLifecycleTransition[];
  events(): readonly AuthenticationLifecycleEvent[];
}

export class DefaultAuthenticationLifecycle implements AuthenticationLifecycle {
  private current: AuthenticationLifecycleState = 'created';

  private readonly records: AuthenticationLifecycleTransition[] = [];

  public constructor(public readonly metadata: AuthenticationLifecycleMetadata = { attributes: {} }) {}

  public get state(): AuthenticationLifecycleState {
    return this.current;
  }

  public transition(to: AuthenticationLifecycleState, attributes: AuthenticationAttributes = {}): AuthenticationLifecycleTransition {
    const record = { from: this.current, to, at: new Date(), attributes };
    this.current = to;
    this.records.push(record);
    return record;
  }

  public transitions(): readonly AuthenticationLifecycleTransition[] {
    return [...this.records];
  }

  public events(): readonly AuthenticationLifecycleEvent[] {
    return this.records.map((record) => ({ state: record.to, at: record.at, attributes: record.attributes }));
  }
}
