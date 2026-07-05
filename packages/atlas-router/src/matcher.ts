import type { HttpContext } from '@atlas/atlas-http';
import type { RouteMetadata } from './metadata';
import type { RouteParameters } from './parameters';
import type { Route } from './route';
import type { RouterLifecycleRecord } from './shared';

export type RouteMatchStrategy = 'exact' | 'prefix' | 'wildcard' | 'parameter' | 'regex' | 'custom';

export interface RouteMatch {
  readonly route: Route;
  readonly parameters: RouteParameters;
  readonly score: number;
  readonly strategy: RouteMatchStrategy;
}

export interface RouteMatchResult {
  readonly matched: boolean;
  readonly match: RouteMatch | undefined;
  readonly metadata: RouteMatcherMetadata;
}

export interface RouteMatcherMetadata extends RouteMetadata {}

export interface RouteMatcherLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RouteMatcher {
  readonly metadata: RouteMatcherMetadata;
  readonly lifecycle: RouteMatcherLifecycle;
  readonly strategy: RouteMatchStrategy;
  match(route: Route, context: HttpContext): RouteMatchResult;
}

export const createRouteMatchResult = (
  matched: boolean,
  metadata: RouteMatcherMetadata,
  match: RouteMatch | undefined = undefined,
): RouteMatchResult => ({
  matched,
  match,
  metadata,
});
