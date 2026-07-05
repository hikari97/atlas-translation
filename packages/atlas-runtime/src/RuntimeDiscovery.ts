import type { RuntimeDiscoveryQuery } from './RuntimeDiscoveryQuery';
import type { RuntimeDiscoveryRecord } from './RuntimeDiscoveryRecord';
import type { RuntimeDiscoveryResult } from './RuntimeDiscoveryResult';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiscovery<TValue = unknown> {
  readonly metadata: RuntimeEventPayload;
  discover(query: RuntimeDiscoveryQuery): Promise<RuntimeDiscoveryResult<TValue>>;
}

export const createStaticRuntimeDiscovery = <TValue>(
  records: readonly RuntimeDiscoveryRecord<TValue>[],
  metadata: RuntimeEventPayload,
): RuntimeDiscovery<TValue> => ({
  metadata,
  async discover(query) {
    const discoveredRecords = records.filter((record) => {
      const matchesType = query.type === undefined || record.type === query.type;
      const matchesCapability = query.capability === undefined || record.capabilities.includes(query.capability);
      const matchesSource = query.source === undefined || record.source.id === query.source.id;
      return matchesType && matchesCapability && matchesSource;
    });

    return {
      records: discoveredRecords,
      discoveredAt: new Date(),
      metadata,
    };
  },
});
