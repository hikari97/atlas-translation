import type { RequestContext } from './context';
import type { RequestLifecycle } from './lifecycle';
import type { RequestMetadata } from './metadata';
import type { RequestMutableRegistry } from './shared';
import { InMemoryRequestRegistry } from './shared';

export interface RequestRegistry extends RequestMutableRegistry<unknown> {}

export interface RequestCore {
  readonly context: RequestContext;
  readonly lifecycle: RequestLifecycle;
  readonly metadata: RequestMetadata;
  readonly registry: RequestRegistry;
}

export const createRequestCore = (
  context: RequestContext,
  lifecycle: RequestLifecycle,
  metadata: RequestMetadata,
  registry: RequestRegistry = new InMemoryRequestRegistry<unknown>(),
): RequestCore => ({
  context,
  lifecycle,
  metadata,
  registry,
});
