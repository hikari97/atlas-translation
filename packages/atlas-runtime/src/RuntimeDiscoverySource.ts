import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiscoverySource {
  readonly id: string;
  readonly type: 'runtime' | 'module' | 'service' | 'hook' | 'pipeline' | 'registry' | 'custom';
  readonly name: string | undefined;
  readonly attributes: RuntimeEventPayload;
}
