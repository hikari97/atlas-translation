# Atlas Authentication

Provider-independent authentication contracts and orchestration for Atlas Studio.

This package models authentication as immutable credentials, context, strategy contracts, resolver/factory infrastructure, and an engine that executes a selected strategy. It does not parse HTTP requests, issue network calls, implement OAuth/OIDC providers, or perform authorization checks.

## Capabilities

- Authentication core services, lifecycle, and metadata.
- Strategy interface and typed authentication results.
- Credential, session, and token value objects.
- Registry, resolver, factory, provider, builder, and engine infrastructure.
- Strict TypeScript build with package-level contract tests.

## Example

See `examples/basic-authentication.ts` for an end-to-end API key strategy wired through registry, resolver, factory, and engine.
