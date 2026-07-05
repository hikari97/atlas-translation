# TASK_PLAN — EPIC-061-ai-worker-foundation

## Epic

Area: `ai-worker-foundation`

Purpose: Establish the AI worker application foundation, runtime boundaries, configuration, health checks, local development structure, and deterministic test foundation.

## Dependencies

- None

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
| TASK-001 | AI Worker App Foundation | Create or normalize the apps/ai-worker application foundation and source layout. |
| TASK-002 | Python Project Config | Define Python project metadata, dependency boundary, formatter/linter/test configuration, and local scripts. |
| TASK-003 | Source Structure | Create a clear source structure for API, core, jobs, engines, providers, pipelines, storage, observability, and tests. |
| TASK-004 | Settings Boundary | Implement typed settings/config loading boundary without committing real secrets. |
| TASK-005 | Runtime Context | Implement AI worker runtime context for settings, lifecycle, diagnostics, and dependency access. |
| TASK-006 | Lifecycle | Implement startup/shutdown lifecycle hooks without starting background jobs on import. |
| TASK-007 | Health Check | Implement health and readiness check contracts for local and deployment use. |
| TASK-008 | Error Model | Implement typed error model and safe serialization for worker errors. |
| TASK-009 | Base Result Model | Implement base result, status, metadata, and error envelope primitives shared by worker features. |
| TASK-010 | Logging Boundary | Implement structured logging boundary without external logging provider lock-in. |
| TASK-011 | Clock And ID Helpers | Implement deterministic clock and ID helper boundaries for tests and job metadata. |
| TASK-012 | File Validation Foundation | Implement safe input file validation boundary for image/page payloads. |
| TASK-013 | Temporary Workspace | Implement temporary workspace/path boundary for intermediate AI artifacts. |
| TASK-014 | Local Development Runner | Create local development runner entrypoint without production deployment assumptions. |
| TASK-015 | Test Fixtures | Create deterministic fixtures for settings, files, images, and worker context. |
| TASK-016 | Foundation Tests | Add tests for settings, health, lifecycle, errors, and deterministic helpers. |
| TASK-017 | Import Boundaries | Audit and enforce local import boundaries inside apps/ai-worker. |
| TASK-018 | Foundation Public Boundary | Finalize internal public boundaries for AI worker foundation modules. |

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
