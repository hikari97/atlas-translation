# Atlas Authentication API

Public APIs are exported from `src/index.ts`.

- `createAuthenticationCore(metadata, lifecycle)`
- `createAuthentication(metadata, capabilities, authenticate)`
- `createAuthenticationResult(authenticated, metadata, principal, session, token, error)`
- `createAuthenticationContext(...)`
- `createAuthenticationCredential(...)`
- `createAuthenticationSession(...)`
- `createAuthenticationToken(...)`
- `createAuthenticationRegistry()`
- `createAuthenticationResolver(registry, factory, metadata, lifecycle)`
- `createAuthenticationFactory(metadata, lifecycle, capabilities, create)`
- `createAuthenticationEngine(resolver, metadata, lifecycle, configuration)`
- `createAuthenticationBuilderFactory()`
- `createAuthenticationProviderRegistry()`

## Core Contracts

- `AuthenticationResolver.supports(contextOrDescriptor)`
- `AuthenticationResolver.resolve(contextOrDescriptor)`
- `AuthenticationRegistry.register(descriptor)`
- `AuthenticationRegistry.resolve(id)`
- `AuthenticationRegistry.entries()`
- `AuthenticationEngine.authenticate(context)`
- `AuthenticationEngine.run({ descriptor, authenticationContext })`
- `AuthenticationProvider.createEngine()`
- `AuthenticationBuilder.scheme(name)`
- `AuthenticationBuilder.strategy(factory)`
- `AuthenticationBuilder.credential(credential)`
- `AuthenticationBuilder.when(condition, configure)`
