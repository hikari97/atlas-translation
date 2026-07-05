# TASK_PLAN — EPIC-063-ai-job-model

## Epic

Area: `ai-job-model`

Purpose: Define AI job types, payloads, lifecycle states, progress events, retry metadata, cancellation, error contracts, and normalized result envelopes.

## Dependencies

- EPIC-061-ai-worker-foundation
- EPIC-062-ai-worker-api

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
| TASK-001 | AI Job Package Boundary | Create shared AI job model boundary in apps/ai-worker and packages/atlas-ai where appropriate. |
| TASK-002 | AI Job Types | Define supported AI job types for OCR, bubble detection, classification, translation, QA, inpainting, rendering assistance, and pipeline jobs. |
| TASK-003 | AI Job Identifier | Implement job ID, correlation ID, trace ID, and idempotency key contracts. |
| TASK-004 | Base Payload Model | Define base payload metadata, source references, target references, language metadata, and options. |
| TASK-005 | Job State Machine | Define lifecycle states and valid transitions for queued, running, succeeded, failed, cancelled, and retrying jobs. |
| TASK-006 | Progress Events | Define progress event model, step metadata, percentages, messages, and timestamps. |
| TASK-007 | Result Envelope | Define normalized result envelope for success, partial success, failure, and cancelled jobs. |
| TASK-008 | Job Error Contract | Define job error codes, retryability, safe messages, and provider error wrapping boundaries. |
| TASK-009 | Retry Metadata | Define retry attempt metadata, backoff hints, max retry policies, and retry decision helpers. |
| TASK-010 | Cancellation Model | Define cancellation request, cancellation token metadata, and cancellation result contracts. |
| TASK-011 | Priority Scheduling Metadata | Define priority, schedule-at, timeout, deadline, and execution policy metadata. |
| TASK-012 | Artifact References | Define input/output/intermediate artifact reference model for storage integration. |
| TASK-013 | Provider Metadata | Define provider, model, version, cost, token, and timing metadata boundaries. |
| TASK-014 | Job Validation | Implement validation helpers for job type, payload, state transition, and result envelope. |
| TASK-015 | Job Serialization | Implement safe serialization/deserialization helpers for job payloads and results. |
| TASK-016 | Job Test Fixtures | Create deterministic job fixtures for all supported job types. |
| TASK-017 | Job Model Tests | Add tests for state transitions, validation, serialization, retry, and cancellation behavior. |
| TASK-018 | AI Job Public API | Finalize AI job model exports and stable contracts for later AI engine EPICs. |

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
