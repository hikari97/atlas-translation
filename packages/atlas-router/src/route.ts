import type { HttpEndpoint, HttpMethod, HttpRequestTarget } from '@atlas/atlas-http';
import type { RouteLifecycle } from './lifecycle';
import type { RouteMetadata } from './metadata';

export interface RouteIdentity {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly method: HttpMethod;
}

export interface RouteEndpoint {
  readonly endpoint: HttpEndpoint;
}

export interface Route {
  readonly identity: RouteIdentity;
  readonly endpoint: HttpEndpoint;
  readonly metadata: RouteMetadata;
  readonly lifecycle: RouteLifecycle;
}

export const createRouteIdentity = (
  id: string,
  name: string,
  path: string,
  method: HttpMethod,
): RouteIdentity => ({
  id,
  name,
  path,
  method,
});

export const routeTargetToIdentityPath = (target: HttpRequestTarget): string => target.value;

export const createRoute = (
  identity: RouteIdentity,
  endpoint: HttpEndpoint,
  metadata: RouteMetadata,
  lifecycle: RouteLifecycle,
): Route => ({
  identity,
  endpoint,
  metadata,
  lifecycle,
});
