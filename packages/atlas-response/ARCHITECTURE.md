# Atlas Response Architecture

Atlas Response follows the package-first API architecture used by the SPRINT-003 packages.

The package is intentionally contract-first:

- `HttpResponse` is the immutable response aggregate.
- `ResponseBody`, `ResponseHeaders`, `ResponseStatus`, `ResponseCookies`, `ResponseCache`, and `ResponseAttachment` model response concerns independently.
- `ResponseContext` composes the aggregate with per-request response services and storage.
- `ResponseLifecycle` records provider-neutral lifecycle transitions.
- `ResponseBuilder` gives application code a fluent way to create response contracts.
- `ResponseProvider` is the runtime boundary for delivery adapters.

Runtime implementations remain outside this package. The package does not write to sockets, serialize headers or cookies, compress payloads, stream files, generate cache validators, or manage persistent storage.
