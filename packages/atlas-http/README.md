# Atlas HTTP

Atlas HTTP provides provider-independent HTTP contracts for Atlas Studio.

The package models HTTP core, context, messages, headers, methods, status codes, protocols, connections, servers, clients, pipelines, handlers, endpoints, metadata, lifecycle, and runtime providers without depending on Express, Node.js networking, browser APIs, or cloud runtimes.

## Design

- Contract-first public API
- Runtime-agnostic server and client abstractions
- Provider registry for future adapters
- Strongly typed metadata and lifecycle models
- No request parsing, response serialization, routing, middleware, or transport implementation

## Usage

```ts
import {
  DefaultHttpMethodRegistry,
  DefaultHttpProtocolRegistry,
  createHttpRequestLine,
  createHttpRequestTarget,
} from '@atlas/atlas-http';

const methods = new DefaultHttpMethodRegistry();
const protocols = new DefaultHttpProtocolRegistry();
const method = methods.lookup('GET');
const protocol = protocols.lookup('HTTP/1.1');

if (method && protocol) {
  createHttpRequestLine(method, createHttpRequestTarget('/health'), protocol);
}
```
