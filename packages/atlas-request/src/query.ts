import type { RequestAttributes, RequestLifecycleRecord } from './shared';

export interface RequestQueryParameter {
  readonly key: string;
  readonly values: readonly string[];
  readonly attributes: RequestAttributes;
}

export interface RequestQueryCollection {
  has(key: string): boolean;
  get(key: string): string | undefined;
  getAll(key: string): readonly string[];
  keys(): readonly string[];
  entries(): readonly RequestQueryParameter[];
}

export interface RequestQueryMetadata {
  readonly attributes: RequestAttributes;
}

export interface RequestQueryLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RequestQuery extends RequestQueryCollection {
  readonly metadata: RequestQueryMetadata;
  readonly lifecycle: RequestQueryLifecycle;
}

export class DefaultRequestQuery implements RequestQuery {
  private readonly parameters = new Map<string, RequestQueryParameter>();

  public readonly lifecycle: RequestQueryLifecycle;

  public constructor(parameters: readonly RequestQueryParameter[] = [], public readonly metadata: RequestQueryMetadata = { attributes: {} }, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    parameters.forEach((parameter) => this.parameters.set(parameter.key, parameter));
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

  public entries(): readonly RequestQueryParameter[] {
    return Array.from(this.parameters.values());
  }
}
