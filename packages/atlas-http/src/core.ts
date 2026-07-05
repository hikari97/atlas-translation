import type { HttpContext } from './context';
import type { HttpLifecycle } from './lifecycle';
import type { HttpMetadata } from './metadata';
import type { HttpMutableRegistry } from './shared';
import { InMemoryHttpRegistry } from './shared';

export interface HttpRegistry extends HttpMutableRegistry<unknown> {}

export interface HttpCore {
  readonly registry: HttpRegistry;
  readonly context: HttpContext;
  readonly lifecycle: HttpLifecycle;
  readonly metadata: HttpMetadata;
}

export const createHttpCore = (
  context: HttpContext,
  lifecycle: HttpLifecycle,
  metadata: HttpMetadata,
  registry: HttpRegistry = new InMemoryHttpRegistry<unknown>(),
): HttpCore => ({
  registry,
  context,
  lifecycle,
  metadata,
});
