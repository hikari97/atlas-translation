import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeEventMetadata {
  readonly correlationId: string | undefined;
  readonly causationId: string | undefined;
  readonly attributes: RuntimeEventPayload;
}
