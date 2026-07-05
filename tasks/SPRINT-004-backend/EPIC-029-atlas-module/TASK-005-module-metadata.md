---
id: TASK-005
title: Module Metadata
status: Completed
priority: High
story_points: 3
sprint: SPRINT-004-backend
epic: EPIC-029-atlas-module
package: atlas-module
owner: H.Makki
reviewer:
created_at: 2026-07-05
updated_at: 2026-07-05
---

# TASK-005 — Module Metadata

## Summary

Implement normalized module metadata, identity, tags, compatibility, and version descriptors.

---

## Goal

Implement module metadata for `atlas-module` while keeping the package framework-independent, type-safe, deterministic, and isolated from app/runtime-specific infrastructure.

---

## Background

`atlas-module` is the Atlas backend module system. It coordinates explicit module definitions, manifests, dependencies, lifecycle hooks, and optional integration boundaries with config, container, runtime, and plugin systems.

This package must be usable by backend API, workers, CLI tools, tests, and future desktop runtimes without depending on UI, HTTP, database, external providers, or application code.

---

## Scope

### Included

- Implement module metadata normalization beyond manifest data.
- Support identity, labels/tags, compatibility metadata, source information, and status flags.
- Add helpers for comparing module identity and version descriptors.
- Keep metadata serializable for diagnostics and debug snapshots.

### Excluded

- Do not implement semantic version solving beyond simple constraints required by the task.
- Do not fetch metadata from package registries.
- Do not implement external discovery.

---

## Deliverables

```txt
packages/atlas-module/src/metadata.ts
packages/atlas-module/src/types.ts
packages/atlas-module/src/index.ts
packages/atlas-module/test/metadata.test.ts
```

---

## Files Allowed

```txt
packages/atlas-module/**
package.json
pnpm-workspace.yaml
tsconfig*.json
```

---

## Files Forbidden

```txt
apps/**
plugins/**
packages/atlas-ui/**
packages/atlas-renderer/**
packages/atlas-http/**
packages/atlas-router/**
packages/atlas-request/**
packages/atlas-response/**
packages/atlas-plugin-*/**
```

---

## Acceptance Criteria

- Module metadata is normalized consistently.
- Metadata helpers are deterministic and testable.
- Metadata remains serializable and safe for diagnostics.
- No external discovery mechanism is introduced.

---

## Testing

- Test metadata normalization.
- Test identity comparison helpers.
- Test serializable debug output.

---

## Definition of Done

- The task scope is implemented only inside allowed files.
- Public APIs added by this task are exported intentionally.
- Tests cover the behavior introduced by this task.
- TypeScript validation passes.
- No forbidden files are modified.
- No unrelated refactor is included.

---

## AI Constraints

- Implement only this task.
- Do not expand scope beyond `atlas-module`.
- Do not implement UI, HTTP, database, network, filesystem discovery, package-manager discovery, or provider-specific integrations.
- Do not add hidden global mutable state.
- Do not require decorators or metadata reflection.
- Do not bypass public APIs of other Atlas packages.
- Preserve existing public APIs unless this task explicitly requires a change.
- If validation fails, stop and report the exact failure.

---

## Implementation Notes

Prefer small pure functions, explicit types, readonly data structures, clear errors/diagnostics, and deterministic output ordering. Keep optional integrations as narrow contracts so `atlas-module` does not become tightly coupled to app-level packages.
