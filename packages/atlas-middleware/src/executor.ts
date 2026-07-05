import type { MiddlewareContext } from './context';
import type { MiddlewareContract, MiddlewareNext } from './interface';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';

export interface MiddlewareExecutionMetadata extends MiddlewareMetadata {}

export interface MiddlewareExecutionLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareExecution {
  readonly middleware: MiddlewareContract;
  readonly startedAt: Date;
  readonly completedAt: Date | undefined;
}

export interface MiddlewareExecutionResult {
  readonly context: MiddlewareContext;
  readonly executed: readonly MiddlewareExecution[];
  readonly completed: boolean;
  readonly error: unknown;
}

export interface MiddlewareExecutor {
  readonly metadata: MiddlewareExecutionMetadata;
  readonly lifecycle: MiddlewareExecutionLifecycle;
  execute(middleware: readonly MiddlewareContract[], context: MiddlewareContext): Promise<MiddlewareExecutionResult>;
}

export const createMiddlewareExecutor = (
  metadata: MiddlewareExecutionMetadata,
  lifecycle: MiddlewareExecutionLifecycle,
): MiddlewareExecutor => ({
  metadata,
  lifecycle,
  async execute(middleware, context) {
    lifecycle.transition('executing');
    const executed: MiddlewareExecution[] = [];
    let index = -1;

    const dispatch = async (nextIndex: number): Promise<void> => {
      if (nextIndex <= index) {
        throw new Error('Middleware next() called multiple times.');
      }
      index = nextIndex;
      const entry = middleware[nextIndex];
      if (entry === undefined) {
        return;
      }
      const execution: MiddlewareExecution = {
        middleware: entry,
        startedAt: new Date(),
        completedAt: undefined,
      };
      executed.push(execution);
      const next: MiddlewareNext = async () => dispatch(nextIndex + 1);
      await entry.handle(context, next);
      executed[executed.length - 1] = {
        ...execution,
        completedAt: new Date(),
      };
    };

    try {
      await dispatch(0);
      lifecycle.transition('completed');
      return {
        context,
        executed,
        completed: true,
        error: undefined,
      };
    } catch (error: unknown) {
      lifecycle.transition('failed');
      return {
        context,
        executed,
        completed: false,
        error,
      };
    }
  },
});
