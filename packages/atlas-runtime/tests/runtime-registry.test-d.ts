import { createRuntimeRegistry, type RuntimePipeline, type RuntimeRegistry, type RuntimeRegistryEntry } from '../src';

const registry: RuntimeRegistry<RuntimePipeline> = createRuntimeRegistry<RuntimePipeline>({
  name: 'Runtime Registry',
  attributes: {
    scope: 'test',
  },
});

const value = {
  id: 'pipeline',
  name: 'Pipeline',
  stages: [],
  metadata: {
    description: undefined,
    attributes: {},
  },
  execute: async () => ({
    completed: true,
    events: [],
    attributes: {},
  }),
} satisfies RuntimePipeline;

const entry: RuntimeRegistryEntry<RuntimePipeline> = {
  key: 'pipeline',
  value,
  metadata: {
    type: 'pipeline',
  },
};

registry.register(entry);
registry.has('pipeline').valueOf();
registry.resolve('pipeline')?.value.id.toUpperCase();
const snapshot = registry.snapshot();
snapshot.metadata.name.toUpperCase();
snapshot.entries[0]?.key.toUpperCase();
snapshot.capturedAt.toISOString();
registry.unregister('pipeline');
registry.has('pipeline').valueOf();
