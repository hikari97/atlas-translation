---
title: EPIC-061-ai-worker-foundation
status: Ready
sprint: SPRINT-006-ai-worker
area: ai-worker-foundation
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-061-ai-worker-foundation

## Purpose

Establish the AI worker application foundation, runtime boundaries, configuration, health checks, local development structure, and deterministic test foundation.

## Scope

AI-worker-focused implementation for `ai-worker-foundation`.

## Dependencies

- None

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
| TASK-001 | AI Worker App Foundation | Ready |
| TASK-002 | Python Project Config | Ready |
| TASK-003 | Source Structure | Ready |
| TASK-004 | Settings Boundary | Ready |
| TASK-005 | Runtime Context | Ready |
| TASK-006 | Lifecycle | Ready |
| TASK-007 | Health Check | Ready |
| TASK-008 | Error Model | Ready |
| TASK-009 | Base Result Model | Ready |
| TASK-010 | Logging Boundary | Ready |
| TASK-011 | Clock And ID Helpers | Ready |
| TASK-012 | File Validation Foundation | Ready |
| TASK-013 | Temporary Workspace | Ready |
| TASK-014 | Local Development Runner | Ready |
| TASK-015 | Test Fixtures | Ready |
| TASK-016 | Foundation Tests | Ready |
| TASK-017 | Import Boundaries | Ready |
| TASK-018 | Foundation Public Boundary | Ready |
