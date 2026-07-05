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

const iterationCount = 1_000;
const metadata = new DefaultAuthenticationMetadata('bench-auth', 'Benchmark Authentication', '0.1.0');
const lifecycle = new DefaultAuthenticationLifecycle();
const descriptor: AuthenticationDescriptor = {
  id: 'bench-authentication',
  name: 'Benchmark Authentication',
  scheme: 'api-key',
  enabled: true,
  attributes: {},
};

const strategy = createAuthentication(metadata, { asynchronous: true, sessionCreation: false, tokenGeneration: false }, async () =>
  createAuthenticationResult(true, metadata, { id: 'bench-user', displayName: undefined }),
);
const registry = createAuthenticationRegistry();
registry.registerAuthentication({ id: descriptor.id, name: descriptor.name, value: strategy, attributes: {} }, descriptor);
const factory = createAuthenticationFactory(metadata, lifecycle, { lazyCreation: true, strategyCreation: true }, () => strategy);
const resolver = createAuthenticationResolver(registry, factory, metadata, lifecycle);
const engine = createAuthenticationEngine(resolver, metadata, lifecycle);
const credential = createAuthenticationCredential('api-key', 'bench-key', { issuer: undefined, subject: undefined, attributes: {} }, lifecycle);
const context = createAuthenticationContext(credential, undefined, undefined, metadata, lifecycle, {
  authenticationId: descriptor.id,
  scheme: descriptor.scheme,
  attributes: [],
});

const startedAt = performance.now();
for (let index = 0; index < iterationCount; index += 1) {
  await engine.run({ descriptor, authenticationContext: context });
}

const elapsedMs = performance.now() - startedAt;
console.log(JSON.stringify({ iterationCount, elapsedMs, operationsPerSecond: Math.round((iterationCount / elapsedMs) * 1000) }));
