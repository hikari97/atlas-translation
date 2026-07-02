# Dependency Graph

## Package Dependencies

```text
atlas-types

↓

atlas-document

↓

atlas-events

↓

atlas-command

↓

atlas-core

↓

atlas-plugin

↓

atlas-renderer

↓

atlas-ui

↓

atlas-workspace

↓

atlas-cli
```

---

# Dependency Rules

Allowed

Lower → Higher

Forbidden

Higher → Lower

---

# Circular Dependency Policy

Circular dependency is prohibited.

Every package must only depend on lower layers.

---

# Dependency Levels

Level 0

atlas-types

Level 1

atlas-document

Level 2

atlas-events

atlas-command

Level 3

atlas-core

Level 4

atlas-plugin

atlas-renderer

Level 5

atlas-ui

Level 6

atlas-workspace

atlas-cli
