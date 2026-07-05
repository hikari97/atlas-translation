import type { RequestAttributes, RequestLifecycleRecord, RequestMutableRegistry, RequestRegistryEntry } from './shared';
import { InMemoryRequestRegistry } from './shared';

export interface RequestMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: RequestAttributes;
}

export interface RequestMetadataLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RequestMetadataRegistry extends RequestMutableRegistry<RequestMetadataEntry> {}

export interface RequestMetadataCollection {
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  set<TValue>(key: string, value: TValue, attributes?: RequestAttributes): void;
  remove(key: string): void;
  entries(): readonly RequestMetadataEntry[];
}

export interface RequestMetadata extends RequestMetadataCollection {
  readonly registry: RequestMetadataRegistry;
  readonly lifecycle: RequestMetadataLifecycle;
}

export class DefaultRequestMetadata implements RequestMetadata {
  public readonly registry: RequestMetadataRegistry = new InMemoryRequestRegistry<RequestMetadataEntry>();

  public readonly lifecycle: RequestMetadataLifecycle;

  public constructor(now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
  }

  public has(key: string): boolean {
    return this.registry.has(key);
  }

  public get<TValue>(key: string): TValue | undefined {
    return this.registry.get(key)?.value as TValue | undefined;
  }

  public set<TValue>(key: string, value: TValue, attributes: RequestAttributes = {}): void {
    this.registry.register({
      id: key,
      name: key,
      value: { key, value, attributes },
    });
  }

  public remove(key: string): void {
    this.registry.remove(key);
  }

  public entries(): readonly RequestMetadataEntry[] {
    return this.registry.entries().map((entry: RequestRegistryEntry<RequestMetadataEntry>) => entry.value);
  }
}
