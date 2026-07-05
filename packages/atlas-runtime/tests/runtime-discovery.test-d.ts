import {
  createStaticRuntimeDiscovery,
  type RuntimeDiscovery,
  type RuntimeDiscoveryQuery,
  type RuntimeDiscoveryRecord,
  type RuntimeDiscoverySource,
} from '../src';

const discoverySource: RuntimeDiscoverySource = {
  id: 'runtime',
  type: 'runtime',
  name: 'Atlas Runtime',
  attributes: {},
};

const discoveryRecord: RuntimeDiscoveryRecord<string> = {
  id: 'service.translation',
  type: 'service',
  value: 'translation-service',
  source: discoverySource,
  capabilities: ['translation', 'health'],
  metadata: {
    owner: 'runtime',
  },
};

const discoveryQuery: RuntimeDiscoveryQuery = {
  type: 'service',
  capability: 'translation',
  source: discoverySource,
  attributes: {},
};

const discovery: RuntimeDiscovery<string> = createStaticRuntimeDiscovery([discoveryRecord], {
  scope: 'test',
});

const discoveryResult = await discovery.discover(discoveryQuery);
discoveryResult.records[0]?.value.toUpperCase();
discoveryResult.discoveredAt.toISOString();
