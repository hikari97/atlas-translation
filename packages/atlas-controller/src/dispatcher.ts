import type { ControllerContext } from './context';
import type { ControllerExecutionResult, ControllerExecutor } from './executor';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerDescriptor } from './registry';
import type { ControllerResolver } from './resolver';

export interface ControllerDispatchContext {
  readonly descriptor: ControllerDescriptor;
  readonly controllerContext: ControllerContext;
}

export interface ControllerDispatch {
  readonly descriptor: ControllerDescriptor;
  readonly dispatchedAt: Date;
}

export interface ControllerDispatcherMetadata extends ControllerMetadata {}

export interface ControllerDispatcherLifecycle extends ControllerLifecycle {}

export interface ControllerDispatcher {
  readonly metadata: ControllerDispatcherMetadata;
  readonly lifecycle: ControllerDispatcherLifecycle;
  dispatch(context: ControllerDispatchContext): Promise<ControllerExecutionResult>;
}

export const createControllerDispatcher = (
  resolver: ControllerResolver,
  executor: ControllerExecutor,
  metadata: ControllerDispatcherMetadata,
  lifecycle: ControllerDispatcherLifecycle,
): ControllerDispatcher => ({
  metadata,
  lifecycle,
  async dispatch(context) {
    lifecycle.transition('dispatching');
    const resolution = resolver.resolve(context.descriptor);
    if (resolution === undefined) {
      lifecycle.transition('failed');
      return {
        context: context.controllerContext,
        execution: {
          controller: {
            metadata,
            capabilities: { asynchronous: true, contextMutation: false, responseCreation: false },
            handle: async () => ({ value: undefined, metadata }),
          },
          startedAt: new Date(),
          completedAt: new Date(),
        },
        result: undefined,
        completed: false,
        error: new Error(`Controller not resolved: ${context.descriptor.id}`),
      };
    }
    const result = await executor.execute(resolution.controller, context.controllerContext);
    lifecycle.transition(result.completed ? 'completed' : 'failed');
    return result;
  },
});
