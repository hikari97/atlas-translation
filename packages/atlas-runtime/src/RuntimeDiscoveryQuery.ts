import type { RuntimeDiscoverySource } from './RuntimeDiscoverySource';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiscoveryQuery {
  readonly type: RuntimeDiscoveryRecordType | undefined;
  readonly capability: string | undefined;
  readonly source: RuntimeDiscoverySource | undefined;
  readonly attributes: RuntimeEventPayload;
}

export type RuntimeDiscoveryRecordType = 'core' | 'context' | 'configuration' | 'module' | 'service' | 'hook' | 'pipeline' | 'registry' | 'custom';
