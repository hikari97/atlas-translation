# TASK_PLAN — EPIC-062-ai-worker-api

## Epic

Area: `ai-worker-api`

Purpose: Implement FastAPI/HTTP-facing AI worker API contracts for health, job submission, job status, result retrieval, cancellation, diagnostics, and errors.

## Dependencies

- EPIC-061-ai-worker-foundation

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
| TASK-001 | API Foundation | Create FastAPI application factory and API module boundaries. |
| TASK-002 | Router Structure | Create router structure for health, jobs, results, diagnostics, and internal routes. |
| TASK-003 | Health Routes | Implement health and readiness HTTP routes using foundation health contracts. |
| TASK-004 | Request Models | Define typed request models for job submission and control operations. |
| TASK-005 | Response Models | Define typed response models for job accepted, status, result, errors, and diagnostics. |
| TASK-006 | API Error Handling | Implement consistent API error responses and exception handling. |
| TASK-007 | Job Submit Route | Implement job submission route boundary without executing provider-backed AI work. |
| TASK-008 | Job Status Route | Implement job status retrieval route boundary with deterministic in-memory development store. |
| TASK-009 | Job Result Route | Implement job result retrieval route boundary. |
| TASK-010 | Job Cancel Route | Implement job cancellation route boundary and response semantics. |
| TASK-011 | Job List Route | Implement job listing route boundary with filtering/pagination contracts. |
| TASK-012 | Diagnostics Route | Implement diagnostics route for safe runtime inspection. |
| TASK-013 | API Validation | Add request validation, file references validation, and safe error mapping. |
| TASK-014 | CORS Security Boundary | Define CORS and security configuration boundaries without hardcoded production assumptions. |
| TASK-015 | OpenAPI Metadata | Define API title, version, tags, and schema metadata for AI worker routes. |
| TASK-016 | API Tests | Add tests for health, job submit/status/result/cancel, validation, and error responses. |
| TASK-017 | API Client Contract | Document and expose stable API response contracts for backend consumers. |
| TASK-018 | API Public Boundary | Finalize API app factory, router exports, and internal module boundaries. |

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
