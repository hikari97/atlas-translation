import type { RouteLifecycle } from './lifecycle';
import type { RouteMetadata } from './metadata';
import type { Route } from './route';

export interface RouteCollectionMetadata extends RouteMetadata {}

export interface RouteCollectionLifecycle extends RouteLifecycle {}

export type RouteCollectionFilter = (route: Route) => boolean;

export interface RouteCollectionIterator extends Iterable<Route> {}

export interface RouteCollection {
  readonly metadata: RouteCollectionMetadata;
  readonly lifecycle: RouteCollectionLifecycle;
  size(): number;
  isEmpty(): boolean;
  contains(route: Route): boolean;
  iterator(): Iterable<Route>;
  filter(filter: RouteCollectionFilter): RouteCollection;
  toArray(): readonly Route[];
}

export class DefaultRouteCollection implements RouteCollection {
  private readonly values: readonly Route[];

  public constructor(
    routes: readonly Route[],
    public readonly metadata: RouteCollectionMetadata,
    public readonly lifecycle: RouteCollectionLifecycle,
  ) {
    this.values = [...routes];
  }

  public size(): number {
    return this.values.length;
  }

  public isEmpty(): boolean {
    return this.values.length === 0;
  }

  public contains(route: Route): boolean {
    return this.values.some((value) => value.identity.id === route.identity.id);
  }

  public iterator(): Iterable<Route> {
    return [...this.values];
  }

  public filter(filter: RouteCollectionFilter): RouteCollection {
    return new DefaultRouteCollection(this.values.filter(filter), this.metadata, this.lifecycle);
  }

  public toArray(): readonly Route[] {
    return [...this.values];
  }
}
