# Atlas Config

Framework-independent configuration contracts for Atlas Studio.

Atlas Config describes configuration values, schemas, defaults, sources, parsing, validation, normalization, resolution, merging, environment overlays, redaction, subscriptions, diagnostics, and integration boundaries.

It does not read files, read `process.env`, open network connections, import applications, or hardcode provider behavior.

## Usage

```ts
import {
  createConfigResolver,
  createStaticConfigSource,
  serializeConfigSafely,
  type ConfigSchema,
} from '@atlas/atlas-config';
```

## Validation

```sh
npm run typecheck
npm run test
npm run test:types
npm run build
```
