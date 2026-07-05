import type { RuntimeDiscoveryRecordType } from './RuntimeDiscoveryQuery';
import type { RuntimeDiscoverySource } from './RuntimeDiscoverySource';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiscoveryRecord<TValue = unknown> {
  readonly id: string;
  readonly type: RuntimeDiscoveryRecordType;
  readonly value: TValue;
  readonly source: RuntimeDiscoverySource;
  readonly capabilities: readonly string[];
  readonly metadata: RuntimeEventPayload;
}
