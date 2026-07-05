import type { MiddlewareContext } from './context';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewareMutableRegistry } from './shared';
import { InMemoryMiddlewareRegistry } from './shared';

export interface MiddlewareCoreRegistry extends MiddlewareMutableRegistry<unknown> {}

export interface MiddlewareCore {
  readonly context: MiddlewareContext;
  readonly lifecycle: MiddlewareLifecycle;
  readonly metadata: MiddlewareMetadata;
  readonly registry: MiddlewareCoreRegistry;
}

export const createMiddlewareCore = (
  context: MiddlewareContext,
  lifecycle: MiddlewareLifecycle,
  metadata: MiddlewareMetadata,
  registry: MiddlewareCoreRegistry = new InMemoryMiddlewareRegistry<unknown>(),
): MiddlewareCore => ({
  context,
  lifecycle,
  metadata,
  registry,
});
