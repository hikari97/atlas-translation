import {
  DefaultMiddlewareBuilder,
  DefaultMiddlewareLifecycle,
  DefaultMiddlewareMetadata,
  createMiddleware,
  createMiddlewareCapability,
  createMiddlewareChain,
  createMiddlewareContext,
  createMiddlewareContextServices,
  createMiddlewareCore,
  createMiddlewareEngine,
  createMiddlewareExecutor,
  createMiddlewarePipeline,
  createMiddlewareProvider,
  createMiddlewareProviderRegistry,
  createMiddlewareRegistry,
  createMiddlewareResolver,
  type MiddlewareContract,
  type MiddlewareDescriptor,
} from '../src';

const capability = createMiddlewareCapability('context', 'Context Mutation');
const metadata = new DefaultMiddlewareMetadata('audit', 'Audit Middleware', '0.1.0', [capability]);
const lifecycle = new DefaultMiddlewareLifecycle();
const context = createMiddlewareContext(
  undefined,
  undefined,
  metadata,
  lifecycle,
  {
    requestId: undefined,
    responseId: undefined,
    middlewareId: 'audit',
    attributes: [],
  },
  createMiddlewareContextServices(),
);

const auditMiddleware: MiddlewareContract = createMiddleware(
  metadata,
  {
    asynchronous: true,
    shortCircuit: false,
    contextMutation: true,
  },
  async (middlewareContext, next): Promise<void> => {
    middlewareContext.services.set('audit', 'Audit Marker', true);
    await next();
  },
);

const terminalMiddleware = createMiddleware(
  new DefaultMiddlewareMetadata('terminal', 'Terminal Middleware', '0.1.0'),
  {
    asynchronous: true,
    shortCircuit: true,
    contextMutation: true,
  },
  async (middlewareContext): Promise<void> => {
    middlewareContext.services.set('terminal', 'Terminal Marker', true);
  },
);

const pipeline = createMiddlewarePipeline(metadata, lifecycle, [auditMiddleware]).append(terminalMiddleware);
const chain = createMiddlewareChain(pipeline.entries(), metadata, lifecycle);
const cursor = chain.next(chain.cursor());
chain.current(cursor);

const registry = createMiddlewareRegistry();
const descriptor: MiddlewareDescriptor = {
  id: auditMiddleware.metadata.id,
  name: auditMiddleware.metadata.name,
  order: 1,
  enabled: true,
  attributes: {},
};
registry.registerMiddleware(
  { id: auditMiddleware.metadata.id, name: auditMiddleware.metadata.name, value: auditMiddleware, attributes: {} },
  descriptor,
);

const resolver = createMiddlewareResolver(registry, undefined, metadata, lifecycle);
const executor = createMiddlewareExecutor(metadata, lifecycle);
const builder = new DefaultMiddlewareBuilder(metadata, lifecycle);
const builderResult = builder.use(auditMiddleware).use(terminalMiddleware).group('api').buildResult();

const provider = createMiddlewareProvider(metadata, lifecycle, {
  registration: true,
  resolution: true,
  execution: true,
});
const providers = createMiddlewareProviderRegistry();
providers.register({ id: provider.metadata.id, name: provider.metadata.name, value: provider, attributes: {} });

const engine = createMiddlewareEngine(resolver, executor, metadata, lifecycle);
const core = createMiddlewareCore(context, lifecycle, metadata);
core.registry.register({ id: 'pipeline', name: 'Pipeline', value: builderResult.pipeline, attributes: {} });

const result = await engine.run({
  pipeline,
  middlewareContext: context,
  descriptors: [descriptor],
});

result.context.services.get<boolean>('audit');
await provider.initialize();
await provider.healthCheck();
await provider.shutdown();
