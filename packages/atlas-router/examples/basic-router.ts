import {
  DefaultRouteLifecycle,
  DefaultRouteMetadata,
  DefaultRouteRegistry,
  createRoute,
  createRouteIdentity,
} from '../src';
import {
  DefaultHttpMethodRegistry,
  DefaultHttpMetadata,
  createHttpEndpoint,
  createHttpHandlerLifecycle,
  createHttpRequestTarget,
  type HttpContext,
  type HttpHandler,
} from '@atlas/atlas-http';

const methods = new DefaultHttpMethodRegistry();
const method = methods.lookup('GET');

if (method === undefined) {
  throw new Error('GET method must be available.');
}

const metadata = new DefaultRouteMetadata();
const lifecycle = new DefaultRouteLifecycle(metadata);
const registry = new DefaultRouteRegistry(metadata);
const httpMetadata = new DefaultHttpMetadata();
const handler: HttpHandler = {
  metadata: httpMetadata,
  lifecycle: createHttpHandlerLifecycle(),
  async handle(context: HttpContext): Promise<void> {
    context.store.set('route', 'health');
  },
};
const target = createHttpRequestTarget('/health');
const endpoint = createHttpEndpoint(
  {
    id: 'health',
    method,
    target,
    attributes: {},
    policies: [],
  },
  handler,
  httpMetadata,
);

const route = createRoute(
  createRouteIdentity('health', 'Health', '/health', method),
  endpoint,
  metadata,
  lifecycle,
);

registry.register(route);

console.log({ routes: registry.routes().length });
