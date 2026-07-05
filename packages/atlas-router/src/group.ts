import type { RouteLifecycle } from './lifecycle';
import type { RouteMetadata } from './metadata';
import type { Route } from './route';
import type { RouteRegistry } from './registry';
import type { RouterAttributes } from './shared';

export interface RouteGroupConfiguration {
  readonly id: string;
  readonly prefix: string;
  readonly version: string | undefined;
  readonly attributes: RouterAttributes;
}

export interface RouteGroupRegistry extends RouteRegistry {}

export interface RouteGroupMetadata extends RouteMetadata {}

export interface RouteGroupLifecycle extends RouteLifecycle {}

export interface RouteGroup {
  readonly configuration: RouteGroupConfiguration;
  readonly registry: RouteGroupRegistry;
  readonly metadata: RouteGroupMetadata;
  readonly lifecycle: RouteGroupLifecycle;
}

export const createRouteGroup = (
  configuration: RouteGroupConfiguration,
  registry: RouteGroupRegistry,
  metadata: RouteGroupMetadata,
  lifecycle: RouteGroupLifecycle,
): RouteGroup => ({
  configuration,
  registry,
  metadata,
  lifecycle,
});

export const getRouteGroupRoutes = (group: RouteGroup): readonly Route[] => group.registry.routes();
