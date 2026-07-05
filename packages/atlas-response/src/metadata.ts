import type { ResponseAttributes, ResponseLifecycleRecord, ResponseMutableRegistry, ResponseRegistryEntry } from './shared';
import { InMemoryResponseRegistry } from './shared';

export interface ResponseMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: ResponseAttributes;
}

export interface ResponseMetadataLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface ResponseMetadataRegistry extends ResponseMutableRegistry<ResponseMetadataEntry> {}

export interface ResponseMetadataCollection {
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  set<TValue>(key: string, value: TValue, attributes?: ResponseAttributes): void;
  remove(key: string): void;
  entries(): readonly ResponseMetadataEntry[];
}

export interface ResponseMetadata extends ResponseMetadataCollection {
  readonly registry: ResponseMetadataRegistry;
  readonly lifecycle: ResponseMetadataLifecycle;
}

export class DefaultResponseMetadata implements ResponseMetadata {
  public readonly registry: ResponseMetadataRegistry = new InMemoryResponseRegistry<ResponseMetadataEntry>();

  public readonly lifecycle: ResponseMetadataLifecycle;

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

  public set<TValue>(key: string, value: TValue, attributes: ResponseAttributes = {}): void {
    this.registry.register({
      id: key,
      name: key,
      value: { key, value, attributes },
    });
  }

  public remove(key: string): void {
    this.registry.remove(key);
  }

  public entries(): readonly ResponseMetadataEntry[] {
    return this.registry.entries().map((entry: ResponseRegistryEntry<ResponseMetadataEntry>) => entry.value);
  }
}
