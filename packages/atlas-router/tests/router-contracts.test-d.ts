import {
  DefaultRouteCollection,
  DefaultRouteLifecycle,
  DefaultRouteMetadata,
  DefaultRouteParameters,
  DefaultRouteRegistry,
  DefaultRouteConstraints,
  HighestScoreRouteResolver,
  createRoute,
  createRouteContext,
  createRouteIdentity,
  createRouterCore,
  createRouteMatchResult,
  createRouteProviderRegistry,
  createRouteProvider,
  createRouteProviderMetadata,
  createRouteConstraint,
  type Route,
  type RouteConstraint,
  type RouteMatcher,
  type RouteProvider,
} from '../src';
import {
  DefaultHttpHeaders,
  DefaultHttpMethodRegistry,
  DefaultHttpMetadata,
  createHttpContext,
  createHttpEndpoint,
  createHttpRequestTarget,
  createHttpHandlerLifecycle,
  type HttpContext,
  type HttpHandler,
} from '@atlas/atlas-http';

const methods = new DefaultHttpMethodRegistry();
const method = methods.lookup('GET');

if (method === undefined) {
  throw new Error('Expected GET method.');
}

const routeMetadata = new DefaultRouteMetadata();
const routeLifecycle = new DefaultRouteLifecycle(routeMetadata);
const httpMetadata = new DefaultHttpMetadata();
const httpContext = createHttpContext(httpMetadata);
const handler: HttpHandler = {
  metadata: httpMetadata,
  lifecycle: createHttpHandlerLifecycle(),
  async handle(context: HttpContext): Promise<void> {
    context.store.set('handled', true);
  },
};

const endpoint = createHttpEndpoint(
  {
    id: 'route-health',
    method,
    target: createHttpRequestTarget('/health'),
    attributes: {},
    policies: [],
  },
  handler,
  httpMetadata,
);

const route = createRoute(
  createRouteIdentity('route-health', 'Health', '/health', method),
  endpoint,
  routeMetadata,
  routeLifecycle,
);

const registry = new DefaultRouteRegistry(routeMetadata);
registry.register(route);
const routes = registry.routes();
const collection = new DefaultRouteCollection(routes, routeMetadata, routeLifecycle);
const filtered = collection.filter((candidate: Route) => candidate.identity.path === '/health');

const parameters = new DefaultRouteParameters(
  [{ name: 'id', value: '123', metadata: routeMetadata }],
  routeMetadata,
);

const constraint: RouteConstraint = createRouteConstraint(
  'has-id',
  'Has ID',
  'custom',
  routeMetadata,
  (_route: Route): boolean => {
    return parameters.has('id');
  },
);

const constraints = new DefaultRouteConstraints(routeMetadata, [constraint]);
const evaluations = constraints.evaluations(route, parameters);
constraints.evaluate(route, parameters);

const matcher: RouteMatcher = {
  metadata: routeMetadata,
  lifecycle: {
    state: 'active',
    transitions: ['created', 'active'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  strategy: 'exact',
  match(candidate: Route): ReturnType<RouteMatcher['match']> {
    return createRouteMatchResult(true, routeMetadata, {
      route: candidate,
      parameters,
      score: 100,
      strategy: 'exact',
    });
  },
};

const match = matcher.match(route, httpContext);
const resolver = new HighestScoreRouteResolver(routeMetadata);
const resolution = resolver.resolve([match]);
const routeContext = createRouteContext(routeMetadata, routeLifecycle, {
  httpContext,
  matches: [match],
  parameters,
  constraints: evaluations,
  resolution,
});

const core = createRouterCore(routeContext, routeLifecycle, routeMetadata);
core.registry.register({ id: 'registry', name: 'Route Registry', value: registry });

const providers = createRouteProviderRegistry();
const providerMetadata = createRouteProviderMetadata(new DefaultRouteMetadata(), 'mock', 'Mock Router', '0.1.0');
const provider: RouteProvider = createRouteProvider(
  providerMetadata,
  routeLifecycle,
  {
    routeRegistration: true,
    routeResolution: true,
    dynamicRoutes: true,
    groupedRoutes: true,
  },
);
providers.register({ id: provider.metadata.id, name: provider.metadata.name, value: provider });

new DefaultHttpHeaders();
await provider.healthCheck();
void filtered;
void resolution;
