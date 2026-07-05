import type { RuntimeEvent } from './RuntimeEvent';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimePipelineResult {
  readonly completed: boolean;
  readonly events: readonly RuntimeEvent[];
  readonly attributes: RuntimeEventPayload;
}
