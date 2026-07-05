import type { RuntimeStateHealth } from './RuntimeStateHealth';
import { createRuntimeStateMetadata, type RuntimeStateMetadata } from './RuntimeStateMetadata';
import { createRuntimeStateTransition, type RuntimeStateTransition } from './RuntimeStateTransition';
import type { RuntimeStateType } from './RuntimeStateType';

export interface RuntimeState {
  readonly current: RuntimeStateType;
  readonly previous: RuntimeStateType;
  readonly health: RuntimeStateHealth;
  readonly metadata: RuntimeStateMetadata;
  readonly transitions: readonly RuntimeStateTransition[];
}

export class DefaultRuntimeState implements RuntimeState {
  private currentValue: RuntimeStateType = 'created';
  private previousValue: RuntimeStateType = 'created';
  private healthValue: RuntimeStateHealth = 'unknown';
  private metadataValue: RuntimeStateMetadata;
  private readonly transitionValues: RuntimeStateTransition[] = [];

  public constructor() {
    this.metadataValue = createRuntimeStateMetadata();
  }

  public get current(): RuntimeStateType {
    return this.currentValue;
  }

  public get previous(): RuntimeStateType {
    return this.previousValue;
  }

  public get health(): RuntimeStateHealth {
    return this.healthValue;
  }

  public get metadata(): RuntimeStateMetadata {
    return this.metadataValue;
  }

  public get transitions(): readonly RuntimeStateTransition[] {
    return this.transitionValues;
  }

  public transition(to: RuntimeStateType, reason: string | undefined = undefined): void {
    this.previousValue = this.currentValue;
    this.currentValue = to;
    this.transitionValues.push(createRuntimeStateTransition(this.previousValue, to, new Date(), reason));
    this.metadataValue = createRuntimeStateMetadata(this.metadataValue.attributes, new Date());
  }

  public reportHealth(health: RuntimeStateHealth): void {
    this.healthValue = health;
  }
}

export const createRuntimeState = (): RuntimeState => new DefaultRuntimeState();
