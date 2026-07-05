import type { RuntimeDiscoveryRecord } from './RuntimeDiscoveryRecord';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiscoveryResult<TValue = unknown> {
  readonly records: readonly RuntimeDiscoveryRecord<TValue>[];
  readonly discoveredAt: Date;
  readonly metadata: RuntimeEventPayload;
}
