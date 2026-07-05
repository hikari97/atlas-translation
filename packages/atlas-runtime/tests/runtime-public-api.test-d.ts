import {
  createRuntimeDiagnostics,
  createRuntimeError,
  createRuntimeErrorHandler,
  createRuntimeEvent,
  createRuntimeHook,
  createRuntimePipeline,
  createRuntimeRegistry,
  createStaticRuntimeDiscovery,
  type RuntimeDiagnosticCheck,
  type RuntimeDiscoveryRecord,
  type RuntimeEventSource,
  type RuntimeHookContext,
  type RuntimePipelineContext,
  type RuntimeRegistry,
} from '../src';

const publicApiSource: RuntimeEventSource = {
  id: 'runtime',
  type: 'runtime',
  name: 'Runtime',
};

const publicApiEvent = createRuntimeEvent('event', 'runtime.started', publicApiSource, new Date('2026-07-05T00:00:00.000Z'), {}, {
  correlationId: undefined,
  causationId: undefined,
  attributes: {},
});

const publicApiHook = createRuntimeHook('hook', 'before.runtime.start', 'normal', {
  name: 'Hook',
  description: undefined,
  attributes: {},
}, async (context: RuntimeHookContext) => {
  context.event?.id.toUpperCase();
});

const publicApiPipeline = createRuntimePipeline('pipeline', 'Pipeline', [{
  id: 'stage',
  name: 'Stage',
  order: 1,
  hooks: [publicApiHook],
  attributes: {},
}], {
  description: undefined,
  attributes: {},
}, async (context: RuntimePipelineContext) => ({
  completed: context.event !== undefined,
  events: [publicApiEvent],
  attributes: {},
}));

const publicApiRegistry: RuntimeRegistry<typeof publicApiPipeline> = createRuntimeRegistry({
  name: 'Registry',
  attributes: {},
});

publicApiRegistry.register({
  key: 'pipeline',
  value: publicApiPipeline,
  metadata: {},
});

const publicApiRecord: RuntimeDiscoveryRecord<typeof publicApiPipeline> = {
  id: 'pipeline',
  type: 'pipeline',
  value: publicApiPipeline,
  source: { id: 'runtime', type: 'runtime', name: 'Runtime', attributes: {} },
  capabilities: ['startup'],
  metadata: {},
};

const publicApiDiscovery = createStaticRuntimeDiscovery([publicApiRecord], {});
const publicApiDiagnosticCheck: RuntimeDiagnosticCheck = {
  id: 'runtime',
  name: 'Runtime',
  severity: 'info',
  metadata: {},
  async run() {
    return { status: 'healthy', severity: 'info', message: 'Runtime contracts are available.', checkedAt: new Date(), metadata: {} };
  },
};
const publicApiDiagnostics = createRuntimeDiagnostics([publicApiDiagnosticCheck], {});
const publicApiError = createRuntimeError('error', 'custom', 'low', 'Test error.', true, {
  component: undefined,
  operation: undefined,
  correlationId: undefined,
  attributes: {},
}, new Date(), {});
const publicApiHandler = createRuntimeErrorHandler({}, async (error) => ({ handled: true, recoverable: error.recoverable, hints: [], metadata: {} }));

await publicApiDiscovery.discover({ type: 'pipeline', capability: 'startup', source: undefined, attributes: {} });
await publicApiDiagnostics.run();
await publicApiHandler.handle(publicApiError);
