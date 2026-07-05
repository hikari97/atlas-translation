import type { ControllerContext } from './context';
import type { ControllerDispatcher } from './dispatcher';
import type { ControllerExecutionResult } from './executor';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerDescriptor } from './registry';

export interface ControllerEngineConfiguration {
  readonly stopOnError: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface ControllerEngineMetadata extends ControllerMetadata {}

export interface ControllerEngineLifecycle extends ControllerLifecycle {}

export interface ControllerEngineContext {
  readonly descriptor: ControllerDescriptor;
  readonly controllerContext: ControllerContext;
}

export interface ControllerEngine {
  readonly metadata: ControllerEngineMetadata;
  readonly lifecycle: ControllerEngineLifecycle;
  readonly configuration: ControllerEngineConfiguration;
  run(context: ControllerEngineContext): Promise<ControllerExecutionResult>;
}

export const createControllerEngine = (
  dispatcher: ControllerDispatcher,
  metadata: ControllerEngineMetadata,
  lifecycle: ControllerEngineLifecycle,
  configuration: ControllerEngineConfiguration = { stopOnError: true, attributes: {} },
): ControllerEngine => ({
  metadata,
  lifecycle,
  configuration,
  async run(context) {
    lifecycle.transition('dispatching');
    const result = await dispatcher.dispatch(context);
    lifecycle.transition(result.completed ? 'completed' : 'failed');
    return result;
  },
});
