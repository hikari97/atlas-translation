import type { HttpAttributes, HttpLifecycleRecord, HttpMutableRegistry, HttpRegistryEntry } from './shared';
import { InMemoryHttpRegistry } from './shared';

export interface HttpMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: HttpAttributes;
}

export interface HttpMetadataLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface HttpMetadataRegistry extends HttpMutableRegistry<HttpMetadataEntry> {}

export interface HttpMetadataCollection {
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  set<TValue>(key: string, value: TValue, attributes?: HttpAttributes): void;
  remove(key: string): void;
  entries(): readonly HttpMetadataEntry[];
}

export interface HttpMetadata extends HttpMetadataCollection {
  readonly registry: HttpMetadataRegistry;
  readonly lifecycle: HttpMetadataLifecycle;
}

export class DefaultHttpMetadata implements HttpMetadata {
  public readonly registry: HttpMetadataRegistry = new InMemoryHttpRegistry<HttpMetadataEntry>();

  public readonly lifecycle: HttpMetadataLifecycle;

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

  public set<TValue>(key: string, value: TValue, attributes: HttpAttributes = {}): void {
    this.registry.register({
      id: key,
      name: key,
      value: { key, value, attributes },
    });
  }

  public remove(key: string): void {
    this.registry.remove(key);
  }

  public entries(): readonly HttpMetadataEntry[] {
    return this.registry.entries().map((entry: HttpRegistryEntry<HttpMetadataEntry>) => entry.value);
  }
}
