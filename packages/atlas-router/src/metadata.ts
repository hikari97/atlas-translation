import type { RouterAttributes, RouterLifecycleRecord, RouterMutableRegistry, RouterRegistryEntry } from './shared';
import { InMemoryRouterRegistry } from './shared';

export interface RouteMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: RouterAttributes;
}

export interface RouteMetadataLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RouteMetadataRegistry extends RouterMutableRegistry<RouteMetadataEntry> {}

export interface RouteMetadataCollection {
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  set<TValue>(key: string, value: TValue, attributes?: RouterAttributes): void;
  remove(key: string): void;
  entries(): readonly RouteMetadataEntry[];
}

export interface RouteMetadata extends RouteMetadataCollection {
  readonly registry: RouteMetadataRegistry;
  readonly lifecycle: RouteMetadataLifecycle;
}

export class DefaultRouteMetadata implements RouteMetadata {
  public readonly registry: RouteMetadataRegistry = new InMemoryRouterRegistry<RouteMetadataEntry>();

  public readonly lifecycle: RouteMetadataLifecycle;

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

  public set<TValue>(key: string, value: TValue, attributes: RouterAttributes = {}): void {
    this.registry.register({
      id: key,
      name: key,
      value: { key, value, attributes },
    });
  }

  public remove(key: string): void {
    this.registry.remove(key);
  }

  public entries(): readonly RouteMetadataEntry[] {
    return this.registry.entries().map((entry: RouterRegistryEntry<RouteMetadataEntry>) => entry.value);
  }
}
