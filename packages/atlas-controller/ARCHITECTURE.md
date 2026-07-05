# Atlas Controller Architecture

Atlas Controller follows the SPRINT-003 API architecture: package-first, contract-first, and provider-neutral.

The package is organized around these layers:

- `ControllerCore` binds context, lifecycle, metadata, and shared registry services.
- `ControllerContract` defines the provider-independent controller interface.
- `ControllerContext` carries request, response, middleware, metadata, lifecycle, and shared services.
- `ControllerRegistry`, `ControllerResolver`, and `ControllerFactory` resolve descriptors to controllers.
- `ControllerDispatcher` prepares dispatch around resolved controllers.
- `ControllerExecutor` performs async controller execution and returns typed results.
- `ControllerBuilder` composes immutable controller definitions.
- `ControllerProvider` is the runtime adapter boundary.
- `ControllerEngine` coordinates dispatching, execution, lifecycle, and metadata propagation.

Runtime integrations remain outside this package. The package does not implement route matching, request parsing, response serialization, validation, dependency injection, networking, or web framework adapters.
