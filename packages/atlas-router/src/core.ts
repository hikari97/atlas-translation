import type { RouteContext } from './context';
import type { RouteLifecycle } from './lifecycle';
import type { RouteMetadata } from './metadata';
import type { RouterMutableRegistry } from './shared';
import { InMemoryRouterRegistry } from './shared';

export interface RouterRegistry extends RouterMutableRegistry<unknown> {}

export interface RouterContext extends RouteContext {}

export interface RouterLifecycle extends RouteLifecycle {}

export interface RouterMetadata extends RouteMetadata {}

export interface RouterCore {
  readonly registry: RouterRegistry;
  readonly context: RouterContext;
  readonly lifecycle: RouterLifecycle;
  readonly metadata: RouterMetadata;
}

export const createRouterCore = (
  context: RouterContext,
  lifecycle: RouterLifecycle,
  metadata: RouterMetadata,
  registry: RouterRegistry = new InMemoryRouterRegistry<unknown>(),
): RouterCore => ({
  registry,
  context,
  lifecycle,
  metadata,
});
