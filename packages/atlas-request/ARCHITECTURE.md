# Atlas Request Architecture

```text
RequestCore
  -> HttpRequest
  -> RequestBody
  -> RequestHeaders
  -> RequestQuery
  -> RequestParameters
  -> RequestCookies
  -> RequestFiles
  -> RequestSession
  -> RequestContext
  -> RequestMetadata
  -> RequestLifecycle
  -> RequestProvider
```

Atlas Request depends on `@atlas/atlas-http` and `@atlas/atlas-router` contracts while remaining independent from concrete runtime providers.
