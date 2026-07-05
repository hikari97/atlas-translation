# Atlas HTTP Architecture

Atlas HTTP is the protocol abstraction layer for the API sprint.

```text
HttpCore
  -> HttpContext
  -> HttpMessage
  -> Protocol Models
  -> Connection
  -> Server / Client
  -> Pipeline
  -> Handler
  -> Endpoint
  -> Metadata
  -> Lifecycle
  -> Provider
```

The package intentionally stops at contracts. Runtime adapters must live outside this package and connect through `HttpProvider`, `HttpServerProvider`, or `HttpClientProvider`.

## Boundaries

- No runtime server startup
- No socket, TLS, QUIC, or transport code
- No routing or middleware implementation
- No request or response specialization
- No framework imports
