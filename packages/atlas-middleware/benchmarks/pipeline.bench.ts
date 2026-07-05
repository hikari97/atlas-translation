import {
  DefaultMiddlewareBuilder,
  DefaultMiddlewareLifecycle,
  DefaultMiddlewareMetadata,
  createMiddleware,
  createMiddlewareContext,
  createMiddlewareContextServices,
  createMiddlewareExecutor,
} from '../src';

const iterations = 1000;
const metadata = new DefaultMiddlewareMetadata('benchmark', 'Benchmark Middleware', '0.1.0');
const lifecycle = new DefaultMiddlewareLifecycle();
const middleware = createMiddleware(
  metadata,
  {
    asynchronous: true,
    shortCircuit: false,
    contextMutation: true,
  },
  async (context, next): Promise<void> => {
    context.services.set('benchmark', 'Benchmark Marker', true);
    await next();
  },
);
const pipeline = new DefaultMiddlewareBuilder(metadata, lifecycle).use(middleware).build();
const executor = createMiddlewareExecutor(metadata, lifecycle);
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  const context = createMiddlewareContext(
    undefined,
    undefined,
    metadata,
    lifecycle,
    {
      requestId: undefined,
      responseId: undefined,
      middlewareId: 'benchmark',
      attributes: [],
    },
    createMiddlewareContextServices(),
  );
  await executor.execute(pipeline.entries(), context);
}

console.log({ iterations, elapsedMs: performance.now() - startedAt });
