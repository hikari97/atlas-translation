import type { RuntimeLifecyclePhase } from './RuntimeLifecyclePhase';

export type RuntimeLifecycleHookEvent =
  | 'before-initialize'
  | 'after-initialize'
  | 'before-start'
  | 'after-start'
  | 'before-stop'
  | 'after-stop';

export interface RuntimeLifecycleHook {
  readonly event: RuntimeLifecycleHookEvent;
  readonly phase: RuntimeLifecyclePhase;
  readonly handler: () => void | Promise<void>;
}

export const createRuntimeLifecycleHook = (
  event: RuntimeLifecycleHookEvent,
  phase: RuntimeLifecyclePhase,
  handler: () => void | Promise<void>,
): RuntimeLifecycleHook => ({ event, phase, handler });
