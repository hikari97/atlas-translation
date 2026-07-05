# TASK_PLAN — EPIC-033-atlas-storage

## Epic

Package: `atlas-storage`

Purpose: Provider-neutral storage abstraction for keys, metadata, drivers, local storage, object operations, listing, checksums, diagnostics, and integrations.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config

## Codex Implementation Rule

Do not implement all tasks at once.

Use these batches:

```txt
TASK-001 to TASK-004
TASK-005 to TASK-008
TASK-009 to TASK-012
TASK-013 to TASK-016
TASK-017 to TASK-018
```

Stop immediately if validation fails.

## Task List

| Task | Title | Goal |
|---|---|---|
| TASK-001 | Storage Package Foundation | Create the package foundation for atlas-storage. |
| TASK-002 | Storage Core Types | Define storage identifiers, object references, operation options, and result contracts. |
| TASK-003 | Storage Key Path | Implement key/path normalization and safe path validation helpers. |
| TASK-004 | Storage Metadata | Define object metadata, content type, size, checksum, timestamps, and custom metadata. |
| TASK-005 | Storage Driver Contract | Define storage driver operations without cloud provider coupling. |
| TASK-006 | Local Storage Driver | Implement deterministic local filesystem storage driver for tests and development. |
| TASK-007 | Object Operations | Implement put, get, exists, delete, copy, and move operation helpers. |
| TASK-008 | Payload Boundary | Define buffer, stream, and byte payload boundaries safely. |
| TASK-009 | Listing Pagination | Implement listing descriptors, prefixes, cursors, and list results. |
| TASK-010 | Bucket Namespace | Implement bucket and namespace abstractions. |
| TASK-011 | Checksum | Implement checksum calculation and verification boundaries. |
| TASK-012 | MIME Metadata | Implement content type helpers without relying on browser APIs. |
| TASK-013 | Signed URL Contract | Define signed URL request/result contracts without provider signing. |
| TASK-014 | Retention Cleanup Contract | Define retention and cleanup descriptors without destructive background behavior. |
| TASK-015 | Config Integration | Expose atlas-config integration boundary for storage configuration. |
| TASK-016 | Runtime Integration | Expose atlas-runtime registration hooks for storage capability. |
| TASK-017 | Storage Test Utilities | Create temporary storage, fake drivers, and storage assertions. |
| TASK-018 | Storage Public API | Finalize public exports and package API documentation boundary. |

## Standard Prompt

```txt
Read README.md, TASK_PLAN.md, and the task files for the current batch.

Implement only the current batch.
Work sequentially.
Before each task, read the full task file.
Only modify Files Allowed.
Do not modify Files Forbidden.
Add or update tests.
Run available validation commands.
Stop on validation failure.
Report files changed, tests run, validation results, and unfinished items.
```
