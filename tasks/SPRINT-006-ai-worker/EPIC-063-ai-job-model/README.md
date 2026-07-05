---
title: EPIC-063-ai-job-model
status: Ready
sprint: SPRINT-006-ai-worker
area: ai-job-model
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-063-ai-job-model

## Purpose

Define AI job types, payloads, lifecycle states, progress events, retry metadata, cancellation, error contracts, and normalized result envelopes.

## Scope

AI-worker-focused implementation for `ai-job-model`.

## Dependencies

- EPIC-061-ai-worker-foundation
- EPIC-062-ai-worker-api

## Deliverables

```txt
apps/ai-worker/**
packages/atlas-ai/**
```

## Acceptance Criteria

- All task files are implemented sequentially.
- AI worker code remains provider-neutral, deterministic, and testable.
- No real secrets or provider calls are added in tests.
- No forbidden paths are modified.
- Tests and typecheck/lint/build commands pass where available.

## Related Documents

- README.MD
- AGENTS.md
- CONSTITUTION.md
- DO_NOT_BREAK.md
- tasks/README.md
- tasks/templates/TASK_TEMPLATE.md
- tasks/SPRINT-006-ai-worker/README.md

## Tasks

| Task | Title | Status |
|---|---|---|
| TASK-001 | AI Job Package Boundary | Ready |
| TASK-002 | AI Job Types | Ready |
| TASK-003 | AI Job Identifier | Ready |
| TASK-004 | Base Payload Model | Ready |
| TASK-005 | Job State Machine | Ready |
| TASK-006 | Progress Events | Ready |
| TASK-007 | Result Envelope | Ready |
| TASK-008 | Job Error Contract | Ready |
| TASK-009 | Retry Metadata | Ready |
| TASK-010 | Cancellation Model | Ready |
| TASK-011 | Priority Scheduling Metadata | Ready |
| TASK-012 | Artifact References | Ready |
| TASK-013 | Provider Metadata | Ready |
| TASK-014 | Job Validation | Ready |
| TASK-015 | Job Serialization | Ready |
| TASK-016 | Job Test Fixtures | Ready |
| TASK-017 | Job Model Tests | Ready |
| TASK-018 | AI Job Public API | Ready |
