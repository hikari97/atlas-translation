import type { RuntimeEvent } from './RuntimeEvent';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimePipelineContext {
  readonly event: RuntimeEvent | undefined;
  readonly attributes: RuntimeEventPayload;
}
