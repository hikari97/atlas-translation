import type { MiddlewareContract } from './interface';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';

export interface MiddlewarePipelineMetadata extends MiddlewareMetadata {}

export interface MiddlewarePipelineLifecycle extends MiddlewareLifecycle {}

export interface MiddlewarePipeline {
  readonly metadata: MiddlewarePipelineMetadata;
  readonly lifecycle: MiddlewarePipelineLifecycle;
  readonly middleware: readonly MiddlewareContract[];
  append(middleware: MiddlewareContract): MiddlewarePipeline;
  prepend(middleware: MiddlewareContract): MiddlewarePipeline;
  entries(): readonly MiddlewareContract[];
}

export const createMiddlewarePipeline = (
  metadata: MiddlewarePipelineMetadata,
  lifecycle: MiddlewarePipelineLifecycle,
  middleware: readonly MiddlewareContract[] = [],
): MiddlewarePipeline => ({
  metadata,
  lifecycle,
  middleware: [...middleware],
  append: (entry) => createMiddlewarePipeline(metadata, lifecycle, [...middleware, entry]),
  prepend: (entry) => createMiddlewarePipeline(metadata, lifecycle, [entry, ...middleware]),
  entries: () => [...middleware],
});
