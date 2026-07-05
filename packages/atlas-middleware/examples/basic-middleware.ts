import {
  DefaultMiddlewareBuilder,
  DefaultMiddlewareLifecycle,
  DefaultMiddlewareMetadata,
  createMiddleware,
  createMiddlewareContext,
  createMiddlewareContextServices,
  createMiddlewareExecutor,
} from '../src';

const metadata = new DefaultMiddlewareMetadata('locale', 'Locale Middleware', '0.1.0');
const lifecycle = new DefaultMiddlewareLifecycle();
const middleware = createMiddleware(
  metadata,
  {
    asynchronous: true,
    shortCircuit: false,
    contextMutation: true,
  },
  async (context, next): Promise<void> => {
    context.services.set('locale', 'Locale', 'id-ID');
    await next();
  },
);
const pipeline = new DefaultMiddlewareBuilder(metadata, lifecycle).use(middleware).build();
const context = createMiddlewareContext(
  undefined,
  undefined,
  metadata,
  lifecycle,
  {
    requestId: undefined,
    responseId: undefined,
    middlewareId: undefined,
    attributes: [],
  },
  createMiddlewareContextServices(),
);
const result = await createMiddlewareExecutor(metadata, lifecycle).execute(pipeline.entries(), context);

console.log({
  completed: result.completed,
  executed: result.executed.length,
  locale: result.context.services.get<string>('locale'),
});
