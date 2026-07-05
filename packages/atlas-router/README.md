# Atlas Router

Atlas Router provides provider-independent routing contracts for Atlas Studio.

The package models router core, routes, groups, match results, parameters, constraints, registries, collections, resolvers, route context, metadata, lifecycle, and providers without depending on runtime routers, networking, middleware, or controller execution.

## Boundaries

- No Express, Fastify, Hono, Node.js, Bun, Deno, or Cloudflare router implementation
- No middleware execution
- No controller dispatch
- No request parsing or networking
- Route matching and resolution are represented as extensible contracts
