import type { ResponseContext } from './context';
import type { ResponseLifecycle } from './lifecycle';
import type { ResponseMetadata } from './metadata';
import type { ResponseMutableRegistry } from './shared';
import { InMemoryResponseRegistry } from './shared';

export interface ResponseRegistry extends ResponseMutableRegistry<unknown> {}

export interface ResponseCore {
  readonly context: ResponseContext;
  readonly lifecycle: ResponseLifecycle;
  readonly metadata: ResponseMetadata;
  readonly registry: ResponseRegistry;
}

export const createResponseCore = (
  context: ResponseContext,
  lifecycle: ResponseLifecycle,
  metadata: ResponseMetadata,
  registry: ResponseRegistry = new InMemoryResponseRegistry<unknown>(),
): ResponseCore => ({
  context,
  lifecycle,
  metadata,
  registry,
});
