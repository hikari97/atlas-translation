import type { ControllerContext } from './context';
import type { ControllerContract, ControllerResult } from './interface';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';

export interface ControllerExecutionMetadata extends ControllerMetadata {}

export interface ControllerExecutionLifecycle extends ControllerLifecycle {}

export interface ControllerExecution {
  readonly controller: ControllerContract;
  readonly startedAt: Date;
  readonly completedAt: Date | undefined;
}

export interface ControllerExecutionResult<TValue = unknown> {
  readonly context: ControllerContext;
  readonly execution: ControllerExecution;
  readonly result: ControllerResult<TValue> | undefined;
  readonly completed: boolean;
  readonly error: unknown;
}

export interface ControllerExecutor {
  readonly metadata: ControllerExecutionMetadata;
  readonly lifecycle: ControllerExecutionLifecycle;
  execute<TValue>(controller: ControllerContract<TValue>, context: ControllerContext): Promise<ControllerExecutionResult<TValue>>;
}

export const createControllerExecutor = (
  metadata: ControllerExecutionMetadata,
  lifecycle: ControllerExecutionLifecycle,
): ControllerExecutor => ({
  metadata,
  lifecycle,
  async execute(controller, context) {
    lifecycle.transition('executing');
    const execution = { controller, startedAt: new Date(), completedAt: undefined };
    try {
      const result = await controller.handle(context);
      lifecycle.transition('completed');
      return {
        context,
        execution: { ...execution, completedAt: new Date() },
        result,
        completed: true,
        error: undefined,
      };
    } catch (error: unknown) {
      lifecycle.transition('failed');
      return {
        context,
        execution: { ...execution, completedAt: new Date() },
        result: undefined,
        completed: false,
        error,
      };
    }
  },
});
