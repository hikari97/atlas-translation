---
title: EPIC-062-ai-worker-api
status: Ready
sprint: SPRINT-006-ai-worker
area: ai-worker-api
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-062-ai-worker-api

## Purpose

Implement FastAPI/HTTP-facing AI worker API contracts for health, job submission, job status, result retrieval, cancellation, diagnostics, and errors.

## Scope

AI-worker-focused implementation for `ai-worker-api`.

## Dependencies

- EPIC-061-ai-worker-foundation

## Deliverables

```txt
apps/ai-worker/**
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
| TASK-001 | API Foundation | Ready |
| TASK-002 | Router Structure | Ready |
| TASK-003 | Health Routes | Ready |
| TASK-004 | Request Models | Ready |
| TASK-005 | Response Models | Ready |
| TASK-006 | API Error Handling | Ready |
| TASK-007 | Job Submit Route | Ready |
| TASK-008 | Job Status Route | Ready |
| TASK-009 | Job Result Route | Ready |
| TASK-010 | Job Cancel Route | Ready |
| TASK-011 | Job List Route | Ready |
| TASK-012 | Diagnostics Route | Ready |
| TASK-013 | API Validation | Ready |
| TASK-014 | CORS Security Boundary | Ready |
| TASK-015 | OpenAPI Metadata | Ready |
| TASK-016 | API Tests | Ready |
| TASK-017 | API Client Contract | Ready |
| TASK-018 | API Public Boundary | Ready |
