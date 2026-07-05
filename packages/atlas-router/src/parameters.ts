import type { RouteMetadata } from './metadata';
import type { RouterLifecycleRecord } from './shared';

export interface RouteParameter<TValue = unknown> {
  readonly name: string;
  readonly value: TValue;
  readonly metadata: RouteParameterMetadata;
}

export interface RouteParameterMetadata extends RouteMetadata {}

export interface RouteParameterLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RouteParameterCollection {
  has(name: string): boolean;
  get<TValue>(name: string): TValue | undefined;
  keys(): readonly string[];
  values(): readonly RouteParameter[];
}

export interface RouteParameters extends RouteParameterCollection {
  readonly metadata: RouteParameterMetadata;
  readonly lifecycle: RouteParameterLifecycle;
}

export class DefaultRouteParameters implements RouteParameters {
  private readonly parameters = new Map<string, RouteParameter>();

  public readonly lifecycle: RouteParameterLifecycle;

  public constructor(
    parameters: readonly RouteParameter[],
    public readonly metadata: RouteParameterMetadata,
    now: Date = new Date(),
  ) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    parameters.forEach((parameter) => this.parameters.set(parameter.name, parameter));
  }

  public has(name: string): boolean {
    return this.parameters.has(name);
  }

  public get<TValue>(name: string): TValue | undefined {
    return this.parameters.get(name)?.value as TValue | undefined;
  }

  public keys(): readonly string[] {
    return Array.from(this.parameters.keys());
  }

  public values(): readonly RouteParameter[] {
    return Array.from(this.parameters.values());
  }
}
