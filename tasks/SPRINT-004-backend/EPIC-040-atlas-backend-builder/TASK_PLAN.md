# TASK_PLAN — EPIC-040-atlas-backend-builder

## Epic

Package: `atlas-backend-builder`

Purpose: Backend composition package for wiring runtime, config, container, modules, database, cache, storage, queue, scheduler, worker, mail, search, notification, diagnostics, and app-facing build plans.

## Dependencies

- EPIC-026-atlas-runtime
- EPIC-027-atlas-config
- EPIC-028-atlas-container
- EPIC-029-atlas-module
- EPIC-030-atlas-database
- EPIC-032-atlas-cache
- EPIC-033-atlas-storage
- EPIC-034-atlas-queue
- EPIC-036-atlas-worker

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
| TASK-001 | Backend Builder Package Foundation | Create the package foundation for atlas-backend-builder. |
| TASK-002 | Backend Builder Core Types | Define builder IDs, build phases, options, results, and diagnostics contracts. |
| TASK-003 | Backend Manifest | Define manifest contracts for enabled capabilities, modules, services, and integrations. |
| TASK-004 | Capability Registry | Implement capability registry descriptors without dynamic package installation. |
| TASK-005 | Config Composition | Compose backend configuration boundaries using atlas-config public API. |
| TASK-006 | Runtime Composition | Compose runtime lifecycle boundaries using atlas-runtime public API. |
| TASK-007 | Container Composition | Compose service registrations using atlas-container public API. |
| TASK-008 | Module Composition | Compose backend modules using atlas-module public API. |
| TASK-009 | Database Composition | Compose database capability descriptors using atlas-database public API. |
| TASK-010 | Cache Storage Composition | Compose cache and storage capability descriptors. |
| TASK-011 | Queue Worker Composition | Compose queue and worker capability descriptors. |
| TASK-012 | Scheduler Composition | Compose scheduler capability descriptors and scheduled worker wiring boundaries. |
| TASK-013 | Mail Search Notification Composition | Compose mail, search, and notification capability descriptors. |
| TASK-014 | Diagnostics Composition | Compose health checks, diagnostics events, and build inspection payloads. |
| TASK-015 | Backend Build Plan | Implement build plan generation that describes registrations and initialization order. |
| TASK-016 | Backend Testing Harness | Create testing harnesses for backend composition without starting external services. |
| TASK-017 | Apps API Boundary | Define the boundary for apps/api to consume backend-builder without modifying apps/api. |
| TASK-018 | Backend Builder Public API | Finalize public exports and package API documentation boundary. |

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
