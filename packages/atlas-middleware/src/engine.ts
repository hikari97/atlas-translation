import type { MiddlewareContext } from './context';
import type { MiddlewareExecutionResult, MiddlewareExecutor } from './executor';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewarePipeline } from './pipeline';
import type { MiddlewareDescriptor } from './registry';
import type { MiddlewareResolver } from './resolver';

export interface MiddlewareEngineConfiguration {
  readonly stopOnError: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface MiddlewareEngineMetadata extends MiddlewareMetadata {}

export interface MiddlewareEngineLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareEngineContext {
  readonly pipeline: MiddlewarePipeline;
  readonly middlewareContext: MiddlewareContext;
  readonly descriptors: readonly MiddlewareDescriptor[];
}

export interface MiddlewareEngine {
  readonly metadata: MiddlewareEngineMetadata;
  readonly lifecycle: MiddlewareEngineLifecycle;
  readonly configuration: MiddlewareEngineConfiguration;
  run(context: MiddlewareEngineContext): Promise<MiddlewareExecutionResult>;
}

export const createMiddlewareEngine = (
  resolver: MiddlewareResolver,
  executor: MiddlewareExecutor,
  metadata: MiddlewareEngineMetadata,
  lifecycle: MiddlewareEngineLifecycle,
  configuration: MiddlewareEngineConfiguration = { stopOnError: true, attributes: {} },
): MiddlewareEngine => ({
  metadata,
  lifecycle,
  configuration,
  async run(context) {
    lifecycle.transition('executing');
    const resolved = resolver.resolveAll(context.descriptors);
    const middleware = resolved.map((resolution) => resolution.middleware);
    const execution = await executor.execute(
      middleware.length > 0 ? middleware : context.pipeline.entries(),
      context.middlewareContext,
    );
    lifecycle.transition(execution.completed ? 'completed' : 'failed');
    return execution;
  },
});
