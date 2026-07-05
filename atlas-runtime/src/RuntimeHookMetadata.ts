import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeHookMetadata {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: RuntimeEventPayload;
}
