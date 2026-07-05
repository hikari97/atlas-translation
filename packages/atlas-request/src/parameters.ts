import type { RouteParameters } from '@atlas/atlas-router';
import type { RequestAttributes, RequestLifecycleRecord } from './shared';

export interface RequestParameter {
  readonly key: string;
  readonly values: readonly string[];
  readonly attributes: RequestAttributes;
}

export interface RequestParameterCollection {
  has(key: string): boolean;
  get(key: string): string | undefined;
  getAll(key: string): readonly string[];
  keys(): readonly string[];
  entries(): readonly RequestParameter[];
}

export interface RequestParameterMetadata {
  readonly attributes: RequestAttributes;
}

export interface RequestParameterLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RequestParameters extends RequestParameterCollection {
  readonly metadata: RequestParameterMetadata;
  readonly lifecycle: RequestParameterLifecycle;
}

export class DefaultRequestParameters implements RequestParameters {
  private readonly parameters = new Map<string, RequestParameter>();

  public readonly lifecycle: RequestParameterLifecycle;

  public constructor(parameters: readonly RequestParameter[] = [], public readonly metadata: RequestParameterMetadata = { attributes: {} }, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    parameters.forEach((parameter) => this.parameters.set(parameter.key, parameter));
  }

  public static fromRouteParameters(routeParameters: RouteParameters): RequestParameters {
    return new DefaultRequestParameters(routeParameters.values().map((parameter) => ({
      key: parameter.name,
      values: [String(parameter.value)],
      attributes: {},
    })));
  }

  public has(key: string): boolean {
    return this.parameters.has(key);
  }

  public get(key: string): string | undefined {
    return this.parameters.get(key)?.values[0];
  }

  public getAll(key: string): readonly string[] {
    return this.parameters.get(key)?.values ?? [];
  }

  public keys(): readonly string[] {
    return Array.from(this.parameters.keys());
  }

  public entries(): readonly RequestParameter[] {
    return Array.from(this.parameters.values());
  }
}
