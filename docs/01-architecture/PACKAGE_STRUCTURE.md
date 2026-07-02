# Package Structure

```text
packages/

atlas-types

atlas-document

atlas-events

atlas-command

atlas-core

atlas-plugin

atlas-renderer

atlas-ui

atlas-workspace

atlas-cli
```

---

# Internal Structure

Each package follows:

```text
src/

contracts/

implementation/

internal/

utils/

index.ts
```

---

# Public Entry

Every package exports only

index.ts

and feature entry points.

No deep imports allowed.
