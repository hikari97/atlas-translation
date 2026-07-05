# Atlas Validation Architecture

Atlas Validation follows the SPRINT-003 API architecture: package-first, contract-first, and provider-neutral.

The package is organized around these layers:

- `ValidationCore` binds context, lifecycle, metadata, and shared registry services.
- `ValidationContract` defines the provider-independent validation interface.
- `ValidationContext` carries input, request, controller, metadata, lifecycle, and shared services.
- `ValidationRegistry`, `ValidationResolver`, and `ValidationFactory` resolve descriptors to validators.
- `ValidationRule` and `ValidationRuleCollection` model reusable rule evaluation.
- `ValidationExecutor` evaluates async rules and aggregates issues.
- `ValidationBuilder` composes immutable validation definitions.
- `ValidationProvider` is the runtime adapter boundary.
- `ValidationEngine` coordinates resolution, execution, lifecycle, and result aggregation.

Runtime integrations remain outside this package. The package does not implement schema runtimes, request parsing, response generation, controller execution, middleware execution, dependency injection, networking, or web framework adapters.
