import {
  DefaultAuthenticationLifecycle,
  DefaultAuthenticationMetadata,
  createAuthentication,
  createAuthenticationBuilderFactory,
  createAuthenticationContext,
  createAuthenticationContextServices,
  createAuthenticationCore,
  createAuthenticationCredential,
  createAuthenticationEngine,
  createAuthenticationFactory,
  createAuthenticationProviderRegistry,
  createAuthenticationRegistry,
  createAuthenticationResolver,
  createAuthenticationResult,
  createAuthenticationSession,
  createAuthenticationToken,
  type AuthenticationDescriptor,
  type AuthenticationEngineContext,
  type AuthenticationPrincipal,
} from '../src';

const metadata = new DefaultAuthenticationMetadata('auth-metadata', 'Authentication Metadata', '0.1.0');
const lifecycle = new DefaultAuthenticationLifecycle();
const principal: AuthenticationPrincipal = { id: 'user-1', displayName: 'User One' };

const credential = createAuthenticationCredential(
  'api-key',
  'secret-api-key',
  {
    issuer: undefined,
    subject: 'user-1',
    attributes: { source: 'test' },
  },
  lifecycle,
);

const session = createAuthenticationSession(
  { id: 'session-1' },
  {
    subject: 'user-1',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    expiresAt: undefined,
    attributes: { durable: true },
  },
  lifecycle,
);
session.id.toUpperCase();
session.state.toUpperCase();
session.expiresAt?.toISOString();

const token = createAuthenticationToken(
  'bearer',
  'token-1',
  { revocable: true, renewable: true },
  {
    subject: 'user-1',
    issuedAt: new Date('2026-01-01T00:00:00.000Z'),
    expiresAt: undefined,
    attributes: { scope: 'read' },
  },
  lifecycle,
);
token.expiresAt?.toISOString();
lifecycle.state.toUpperCase();

const context = createAuthenticationContext(
  credential,
  undefined,
  undefined,
  metadata,
  lifecycle,
  {
    authenticationId: 'auth-api-key',
    scheme: 'api-key',
    attributes: [],
  },
  createAuthenticationContextServices(),
);

context.services.set('tenant', 'Tenant', 'atlas');
const tenant = context.services.get<string>('tenant');
tenant?.toUpperCase();

const strategy = createAuthentication(
  metadata,
  { asynchronous: true, sessionCreation: true, tokenGeneration: true },
  async () => createAuthenticationResult(true, metadata, principal, session, token),
);

const descriptor: AuthenticationDescriptor = {
  id: 'auth-api-key',
  name: 'API Key Authentication',
  scheme: 'api-key',
  enabled: true,
  attributes: { priority: 1 },
};

const registry = createAuthenticationRegistry();
registry.register(descriptor);
const registeredDescriptor = registry.resolve(descriptor.id);
registeredDescriptor?.scheme.toUpperCase();
registry.entries()[0]?.id.toUpperCase();
registry.registerAuthentication(
  {
    id: descriptor.id,
    name: descriptor.name,
    value: strategy,
    attributes: {},
  },
  descriptor,
);

const factory = createAuthenticationFactory(
  metadata,
  lifecycle,
  { lazyCreation: true, strategyCreation: true },
  () => strategy,
  (candidate) => candidate.id === descriptor.id,
);
const resolver = createAuthenticationResolver(registry, factory, metadata, lifecycle);
const resolverSupportsContext: boolean = resolver.supports(context);
resolverSupportsContext.valueOf();
const engine = createAuthenticationEngine(resolver, metadata, lifecycle);
const engineContext: AuthenticationEngineContext = { descriptor, authenticationContext: context };
const authenticatedFromContext = await engine.authenticate(context);
authenticatedFromContext.authenticated.valueOf();
const authenticated = await engine.run(engineContext);
authenticated.principal?.id.toUpperCase();
authenticated.session?.identifier.id.toUpperCase();
authenticated.token?.value.toUpperCase();

const unresolved = await engine.run({
  descriptor: { ...descriptor, id: 'missing-authentication' },
  authenticationContext: context,
});
unresolved.error?.toUpperCase();

const builderFactory = createAuthenticationBuilderFactory();
const definitions = builderFactory.create().authentication(descriptor, strategy).buildResult().definitions;
definitions[0]?.descriptor.scheme.toUpperCase();
const fluentDefinitions = builderFactory
  .create()
  .scheme('api-key')
  .credential(credential)
  .strategy(factory)
  .when(true, (builder) => {
    builder.scheme('api-key');
  })
  .build();
fluentDefinitions[0]?.strategy.metadata.id.toUpperCase();

const providerRegistry = createAuthenticationProviderRegistry();
providerRegistry.register({
  id: 'provider-1',
  name: 'Provider One',
  value: {
    metadata,
    lifecycle,
    capabilities: { registration: true, resolution: true, execution: true },
    registry,
    resolver,
    engine,
    createEngine: () => engine,
    initialize: async () => undefined,
    shutdown: async () => undefined,
    healthCheck: async () => ({ healthy: true, checkedAt: new Date('2026-01-01T00:00:00.000Z'), message: undefined }),
  },
  attributes: {},
});

const core = createAuthenticationCore(context, lifecycle, metadata);
core.services.register({ id: 'engine', name: 'Engine', value: engine, attributes: {} });
core.services.get('engine')?.name.toUpperCase();
