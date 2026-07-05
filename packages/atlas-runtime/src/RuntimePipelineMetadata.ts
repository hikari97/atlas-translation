import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimePipelineMetadata {
  readonly description: string | undefined;
  readonly attributes: RuntimeEventPayload;
}
