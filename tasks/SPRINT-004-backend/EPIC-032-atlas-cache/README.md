---
title: EPIC-032-atlas-cache
status: Ready
sprint: SPRINT-004-backend
package: atlas-cache
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-032-atlas-cache

## Purpose

Provider-neutral cache abstraction for keys, entries, stores, TTL, namespaces, tags, invalidation, metrics, errors, and integrations.

## Scope

Cache contracts and deterministic in-memory adapter only; no Redis or hosted cache provider.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-cache/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-cache` remains reusable and framework-independent.
- Public API is clear and exported from package entrypoint.
- No application code is modified by package tasks.
- TypeScript, tests, and build pass where available.
- No circular dependencies are introduced.

## Related Documents

- README.MD
- AGENTS.md
- CONSTITUTION.md
- DO_NOT_BREAK.md
- tasks/README.md
- tasks/templates/TASK_TEMPLATE.md

## Tasks

| Task | Title | Status |
|---|---|---|
| TASK-001 | Cache Package Foundation | Ready |
| TASK-002 | Cache Core Types | Ready |
| TASK-003 | Cache Key | Ready |
| TASK-004 | Cache Entry | Ready |
| TASK-005 | Cache Store Contract | Ready |
| TASK-006 | Memory Store | Ready |
| TASK-007 | TTL Expiration | Ready |
| TASK-008 | Cache Namespace | Ready |
| TASK-009 | Cache Serialization | Ready |
| TASK-010 | Cache Invalidation | Ready |
| TASK-011 | Cache Tags | Ready |
| TASK-012 | Stampede Protection | Ready |
| TASK-013 | Cache Metrics | Ready |
| TASK-014 | Cache Error Model | Ready |
| TASK-015 | Config Integration | Ready |
| TASK-016 | Runtime Integration | Ready |
| TASK-017 | Cache Test Utilities | Ready |
| TASK-018 | Cache Public API | Ready |
