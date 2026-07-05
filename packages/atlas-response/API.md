# Atlas Response API

The public API is exported from `src/index.ts`.

Primary contracts:

- `HttpResponse`
- `ResponseBody`
- `ResponseHeaders`
- `ResponseStatus`
- `ResponseCookies`
- `ResponseCache`
- `ResponseAttachment`
- `ResponseContext`
- `ResponseMetadata`
- `ResponseLifecycle`
- `ResponseBuilder`
- `ResponseProvider`

Factory helpers create immutable aggregate values and in-memory registries for provider-neutral composition.

Builder outputs:

- `ResponseBuilder.build()` returns an immutable `HttpResponse` aggregate.
- `ResponseBuilder.buildResult()` returns the aggregate plus a composed `ResponseContext` for code paths that need context services.
