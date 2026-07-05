import type { Route, RouteIdentity } from './route';
import type { RouteMetadata } from './metadata';
import type { RouterLifecycleRecord } from './shared';

export interface RouteRegistryEntry {
  readonly identity: RouteIdentity;
  readonly route: Route;
}

export interface RouteRegistryMetadata extends RouteMetadata {}

export interface RouteRegistryLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RouteRegistryLookup {
  has(identity: RouteIdentity): boolean;
  get(identity: RouteIdentity): Route | undefined;
}

export interface RouteRegistry extends RouteRegistryLookup {
  readonly metadata: RouteRegistryMetadata;
  readonly lifecycle: RouteRegistryLifecycle;
  register(route: Route): void;
  unregister(route: Route): void;
  routes(): readonly Route[];
  entries(): readonly RouteRegistryEntry[];
}

export class DefaultRouteRegistry implements RouteRegistry {
  private readonly values = new Map<string, Route>();

  public readonly metadata: RouteRegistryMetadata;

  public readonly lifecycle: RouteRegistryLifecycle;

  public constructor(metadata: RouteRegistryMetadata, now: Date = new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
  }

  public register(route: Route): void {
    this.values.set(route.identity.id, route);
  }

  public unregister(route: Route): void {
    this.values.delete(route.identity.id);
  }

  public has(identity: RouteIdentity): boolean {
    return this.values.has(identity.id);
  }

  public get(identity: RouteIdentity): Route | undefined {
    return this.values.get(identity.id);
  }

  public routes(): readonly Route[] {
    return Array.from(this.values.values());
  }

  public entries(): readonly RouteRegistryEntry[] {
    return this.routes().map((route) => ({
      identity: route.identity,
      route,
    }));
  }
}
