# Atlas Authentication Architecture

Atlas Authentication follows the SPRINT-003 EPIC-023 architecture:

Credential -> AuthenticationContext -> AuthenticationEngine -> AuthenticationResolver -> AuthenticationContract -> AuthenticationResult.

The package is intentionally provider-neutral. Concrete integrations such as OAuth, SAML, LDAP, JWT signing, password hashing, and web framework adapters belong in provider packages or higher-level API integration layers.

## Components

- Core: metadata, lifecycle, and shared services.
- Interface: strategy contract, capabilities, principal, and result.
- Context: request/controller optional links and scoped service storage.
- Registry: descriptor-based strategy registration and lookup.
- Resolver: chooses a registered strategy or creates one through a factory.
- Engine: runs the resolved strategy and records lifecycle transitions.
- Provider: groups registry, resolver, and engine behind provider capabilities.
