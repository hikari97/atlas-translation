import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeErrorContext {
  readonly component: string | undefined;
  readonly operation: string | undefined;
  readonly correlationId: string | undefined;
  readonly attributes: RuntimeEventPayload;
}
