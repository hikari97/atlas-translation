import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeRegistryMetadata {
  readonly name: string;
  readonly attributes: RuntimeEventPayload;
}
