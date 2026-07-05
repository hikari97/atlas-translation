# Atlas Config Architecture

Atlas Config is a framework-independent configuration package.

## Boundaries

Included:

- Config type contracts
- Schema contracts
- Static in-memory sources
- Parsing and validation
- Normalization and deterministic merge
- Injected environment overlays
- Secret redaction
- Change subscription contracts
- Runtime and plugin integration contracts

Excluded:

- Filesystem loading
- Network loading
- Direct `process.env` reads
- Application routes
- UI code
- Provider-specific behavior

## Flow

```text
Source
  -> Parser
  -> Defaults
  -> Merge
  -> Environment Overlay
  -> Validator
  -> Normalizer
  -> Resolved Config
```
