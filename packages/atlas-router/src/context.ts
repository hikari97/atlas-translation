import type { HttpContext } from '@atlas/atlas-http';
import type { RouteLifecycle } from './lifecycle';
import type { RouteMetadata } from './metadata';
import type { RouteMatchResult } from './matcher';
import type { RouteParameters } from './parameters';
import type { RouteConstraintEvaluation } from './constraints';
import type { RouteResolution } from './resolver';
import type { RouterRegistryEntry } from './shared';
import { InMemoryRouterRegistry } from './shared';

export interface RouteContextState {
  readonly httpContext: HttpContext | undefined;
  readonly matches: readonly RouteMatchResult[];
  readonly parameters: RouteParameters | undefined;
  readonly constraints: readonly RouteConstraintEvaluation[];
  readonly resolution: RouteResolution | undefined;
}

export interface RouteContextMetadata extends RouteMetadata {}

export interface RouteContextLifecycle extends RouteLifecycle {}

export interface RouteContextStorage {
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  set<TValue>(key: string, value: TValue): void;
  remove(key: string): void;
  entries(): readonly RouterRegistryEntry<unknown>[];
}

export interface RouteContext {
  readonly metadata: RouteContextMetadata;
  readonly lifecycle: RouteContextLifecycle;
  readonly state: RouteContextState;
  readonly storage: RouteContextStorage;
}

export class DefaultRouteContextStorage implements RouteContextStorage {
  private readonly values = new InMemoryRouterRegistry<unknown>();

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get<TValue>(key: string): TValue | undefined {
    return this.values.get(key) as TValue | undefined;
  }

  public set<TValue>(key: string, value: TValue): void {
    this.values.register({ id: key, name: key, value });
  }

  public remove(key: string): void {
    this.values.remove(key);
  }

  public entries(): readonly RouterRegistryEntry<unknown>[] {
    return this.values.entries();
  }
}

export const createRouteContext = (
  metadata: RouteContextMetadata,
  lifecycle: RouteContextLifecycle,
  state: RouteContextState,
  storage: RouteContextStorage = new DefaultRouteContextStorage(),
): RouteContext => ({
  metadata,
  lifecycle,
  state,
  storage,
});
