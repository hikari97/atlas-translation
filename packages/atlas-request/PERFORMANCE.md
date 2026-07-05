# Performance

Atlas Request uses simple immutable collection views and map-backed registries for request-scoped data.

- Query, parameter, cookie, and file lookup use `Map`.
- Metadata and session state use request-scoped registries.
- No body parsing or runtime IO occurs in this package.
