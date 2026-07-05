# Atlas Container Architecture

Atlas Container is a framework-independent dependency injection package.

## Boundaries

Included:

- Typed tokens
- Explicit providers
- Registration registry
- Sync and async resolution
- Singleton, transient, and scoped lifetimes
- Child scopes
- Module composition
- Diagnostic snapshots
- Adapter patterns for config, runtime, plugins, and tests

Excluded:

- HTTP servers
- Databases
- Network loading
- Filesystem discovery
- UI code
- Decorators and reflection metadata
- Global mutable containers

## Flow

```txt
Token + Provider
  -> Registration
  -> Registry
  -> Resolver
  -> Lifetime Cache
  -> Service Instance
```
