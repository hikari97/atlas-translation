import {
  DefaultHttpMethodRegistry,
  DefaultHttpMetadata,
  createHttpEndpoint,
  createHttpHandlerLifecycle,
  createHttpRequestTarget,
  type HttpContext,
  type HttpHandler,
} from '@atlas/atlas-http';
import { DefaultRouteLifecycle, DefaultRouteMetadata, DefaultRouteRegistry, createRoute, createRouteIdentity } from '../src';

const method = new DefaultHttpMethodRegistry().lookup('GET');

if (method === undefined) {
  throw new Error('GET method must exist.');
}

const iterations = 1000;
const metadata = new DefaultRouteMetadata();
const registry = new DefaultRouteRegistry(metadata);
const lifecycle = new DefaultRouteLifecycle(metadata);
const httpMetadata = new DefaultHttpMetadata();
const handler: HttpHandler = {
  metadata: httpMetadata,
  lifecycle: createHttpHandlerLifecycle(),
  async handle(context: HttpContext): Promise<void> {
    context.store.set('benchmark', true);
  },
};
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  const target = createHttpRequestTarget(`/routes/${index}`);
  const endpoint = createHttpEndpoint(
    {
      id: `endpoint-${index}`,
      method,
      target,
      attributes: {},
      policies: [],
    },
    handler,
    httpMetadata,
  );
  const route = createRoute(
    createRouteIdentity(`route-${index}`, `Route ${index}`, `/routes/${index}`, method),
    endpoint,
    metadata,
    lifecycle,
  );
  registry.register(route);
  registry.has(route.identity);
}

console.log({ iterations, elapsedMs: performance.now() - startedAt });
