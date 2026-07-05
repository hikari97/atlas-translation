---
title: EPIC-033-atlas-storage
status: Ready
sprint: SPRINT-004-backend
package: atlas-storage
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-033-atlas-storage

## Purpose

Provider-neutral storage abstraction for keys, metadata, drivers, local storage, object operations, listing, checksums, diagnostics, and integrations.

## Scope

Storage contracts and deterministic local driver only; no S3/GCS/R2 provider implementation.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Deliverables

```txt
packages/atlas-storage/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- `atlas-storage` remains reusable and framework-independent.
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
| TASK-001 | Storage Package Foundation | Ready |
| TASK-002 | Storage Core Types | Ready |
| TASK-003 | Storage Key Path | Ready |
| TASK-004 | Storage Metadata | Ready |
| TASK-005 | Storage Driver Contract | Ready |
| TASK-006 | Local Storage Driver | Ready |
| TASK-007 | Object Operations | Ready |
| TASK-008 | Payload Boundary | Ready |
| TASK-009 | Listing Pagination | Ready |
| TASK-010 | Bucket Namespace | Ready |
| TASK-011 | Checksum | Ready |
| TASK-012 | MIME Metadata | Ready |
| TASK-013 | Signed URL Contract | Ready |
| TASK-014 | Retention Cleanup Contract | Ready |
| TASK-015 | Config Integration | Ready |
| TASK-016 | Runtime Integration | Ready |
| TASK-017 | Storage Test Utilities | Ready |
| TASK-018 | Storage Public API | Ready |
