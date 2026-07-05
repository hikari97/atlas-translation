import type { RuntimeEvent } from './RuntimeEvent';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeHookContext {
  readonly event: RuntimeEvent | undefined;
  readonly attributes: RuntimeEventPayload;
}
