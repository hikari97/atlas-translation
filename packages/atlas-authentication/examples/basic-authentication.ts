import {
  DefaultAuthenticationLifecycle,
  DefaultAuthenticationMetadata,
  createAuthentication,
  createAuthenticationContext,
  createAuthenticationCredential,
  createAuthenticationEngine,
  createAuthenticationFactory,
  createAuthenticationRegistry,
  createAuthenticationResolver,
  createAuthenticationResult,
  type AuthenticationDescriptor,
} from '../src';

const metadata = new DefaultAuthenticationMetadata('example-auth', 'Example Authentication', '0.1.0');
const lifecycle = new DefaultAuthenticationLifecycle();

const descriptor: AuthenticationDescriptor = {
  id: 'example-api-key',
  name: 'Example API Key',
  scheme: 'api-key',
  enabled: true,
  attributes: {},
};

const strategy = createAuthentication(
  metadata,
  { asynchronous: true, sessionCreation: false, tokenGeneration: false },
  async (context) =>
    createAuthenticationResult(context.credential.value === 'atlas-secret', metadata, {
      id: 'atlas-user',
      displayName: 'Atlas User',
    }),
);

const registry = createAuthenticationRegistry();
registry.registerAuthentication({ id: descriptor.id, name: descriptor.name, value: strategy, attributes: {} }, descriptor);

const factory = createAuthenticationFactory(metadata, lifecycle, { lazyCreation: true, strategyCreation: true }, () => strategy);
const resolver = createAuthenticationResolver(registry, factory, metadata, lifecycle);
const engine = createAuthenticationEngine(resolver, metadata, lifecycle);

const credential = createAuthenticationCredential('api-key', 'atlas-secret', { issuer: undefined, subject: undefined, attributes: {} }, lifecycle);
const context = createAuthenticationContext(credential, undefined, undefined, metadata, lifecycle, {
  authenticationId: descriptor.id,
  scheme: descriptor.scheme,
  attributes: [],
});

const result = await engine.run({ descriptor, authenticationContext: context });

console.log(JSON.stringify({ authenticated: result.authenticated, principalId: result.principal?.id }));
