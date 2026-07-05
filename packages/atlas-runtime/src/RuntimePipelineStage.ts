import type { RuntimeHook } from './RuntimeHook';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimePipelineStage {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly hooks: readonly RuntimeHook[];
  readonly attributes: RuntimeEventPayload;
}
