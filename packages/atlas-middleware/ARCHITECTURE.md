# Atlas Middleware Architecture

Atlas Middleware follows the SPRINT-003 API architecture: package-first, contract-first, and provider-neutral.

The package is organized around these layers:

- `MiddlewareCore` binds context, lifecycle, metadata, and shared registry services.
- `MiddlewareContract` defines the provider-independent middleware interface.
- `MiddlewareContext` carries request, response, metadata, lifecycle, and shared services.
- `MiddlewarePipeline` and `MiddlewareChain` define ordered execution.
- `MiddlewareRegistry` and `MiddlewareResolver` map descriptors to middleware.
- `MiddlewareExecutor` performs async context propagation across middleware.
- `MiddlewareBuilder` composes immutable pipelines.
- `MiddlewareProvider` is the runtime adapter boundary.
- `MiddlewareEngine` coordinates resolver, executor, lifecycle, and metadata propagation.

Runtime integrations remain outside this package. The package does not implement Express, Fastify, Hono, Node.js server adapters, dependency injection, validation, routing, networking, request parsing, or response generation.
