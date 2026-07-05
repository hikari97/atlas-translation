# Atlas Router Architecture

```text
RouterCore
  -> Route
  -> RouteGroup
  -> RouteMatcher
  -> RouteParameters
  -> RouteConstraints
  -> RouteRegistry
  -> RouteCollection
  -> RouteResolver
  -> RouteContext
  -> RouteMetadata
  -> RouteLifecycle
  -> RouteProvider
```

Atlas Router depends on `@atlas/atlas-http` contracts, especially `HttpEndpoint` and `HttpContext`, but it does not depend on a concrete HTTP runtime.
