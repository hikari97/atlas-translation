import type { RuntimeHookContext } from './RuntimeHookContext';
import type { RuntimeHookMetadata } from './RuntimeHookMetadata';
import type { RuntimeHookPriority } from './RuntimeHookPriority';
import type { RuntimeHookType } from './RuntimeHookType';

export interface RuntimeHook {
  readonly id: string;
  readonly type: RuntimeHookType;
  readonly priority: RuntimeHookPriority;
  readonly metadata: RuntimeHookMetadata;
  execute(context: RuntimeHookContext): Promise<void>;
}

export const createRuntimeHook = (
  id: string,
  type: RuntimeHookType,
  priority: RuntimeHookPriority,
  metadata: RuntimeHookMetadata,
  execute: (context: RuntimeHookContext) => Promise<void>,
): RuntimeHook => ({
  id,
  type,
  priority,
  metadata,
  execute,
});
