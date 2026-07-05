---
id: EPIC-026-TASK-PLAN
title: Atlas Runtime Task Plan
status: Draft
sprint: SPRINT-004
epic: EPIC-026
package: atlas-runtime
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# EPIC-026 — Atlas Runtime TASK_PLAN

## Purpose

This file is a compact planning source for Codex and other AI coding assistants.

Use this file to generate full task documents one at a time without manually copy-pasting long task descriptions into the Epic file.

## Sprint

- Sprint: `SPRINT-004`
- Sprint Title: Backend Runtime
- Epic: `EPIC-026`
- Package: `atlas-runtime`

## Usage Rule

Codex must treat this file as a planning aid, not as permission to implement production code.

For implementation work, Codex must generate or open one concrete `TASK-*.md` file and follow that task only.

## Task Sequence

| Task     | File                                 | Title                                   | Status                      | Points | Depends On          |
| -------- | ------------------------------------ | --------------------------------------- | --------------------------- | -----: | ------------------- |
| TASK-001 | `TASK-001-runtime-core.md`           | Implement Runtime Core                  | Ready / Existing            |     21 | EPIC-016 atlas-http |
| TASK-002 | `TASK-002-runtime-environment.md`    | Implement Runtime Environment           | Ready / Existing            |      8 | TASK-001            |
| TASK-003 | `TASK-003-runtime-configuration.md`  | Implement Runtime Configuration         | Ready / Existing            |      8 | TASK-002            |
| TASK-004 | `TASK-004-runtime-lifecycle.md`      | Implement Runtime Lifecycle             | Ready / Existing            |      8 | TASK-003            |
| TASK-005 | `TASK-005-runtime-state.md`          | Implement Runtime State                 | Ready / Existing            |      5 | TASK-004            |
| TASK-006 | `TASK-006-runtime-context.md`        | Implement Runtime Context               | Ready / Existing            |      5 | TASK-005            |
| TASK-007 | `TASK-007-runtime-service.md`        | Implement Runtime Service               | Ready / Existing            |      8 | TASK-006            |
| TASK-008 | `TASK-008-runtime-module.md`         | Implement Runtime Module                | Ready / Existing            |      8 | TASK-007            |
| TASK-009 | `TASK-009-runtime-event.md`          | Implement Runtime Event                 | Current / Ready file exists |      8 | TASK-008            |
| TASK-010 | `TASK-010-runtime-hook.md`           | Implement Runtime Hook                  | Planned                     |      5 | TASK-009            |
| TASK-011 | `TASK-011-runtime-pipeline.md`       | Implement Runtime Pipeline              | Planned                     |      8 | TASK-010            |
| TASK-012 | `TASK-012-runtime-registry.md`       | Implement Runtime Registry              | Planned                     |      8 | TASK-011            |
| TASK-013 | `TASK-013-runtime-discovery.md`      | Implement Runtime Discovery             | Planned                     |      5 | TASK-012            |
| TASK-014 | `TASK-014-runtime-diagnostics.md`    | Implement Runtime Diagnostics           | Planned                     |      5 | TASK-013            |
| TASK-015 | `TASK-015-runtime-error-handling.md` | Implement Runtime Error Handling        | Planned                     |      5 | TASK-014            |
| TASK-016 | `TASK-016-runtime-public-api.md`     | Build Runtime Public API                | Planned                     |      3 | TASK-015            |
| TASK-017 | `TASK-017-runtime-testing.md`        | Runtime Testing                         | Planned                     |      5 | TASK-016            |
| TASK-018 | `TASK-018-runtime-documentation.md`  | Runtime Documentation and Release Ready | Planned                     |      3 | TASK-017            |

## Recommended Generation Workflow

1. Read project rules and task template.
2. Read this `TASK_PLAN.md`.
3. Select exactly one task from the table.
4. Generate or complete only that task file.
5. Do not continue to the next task unless explicitly instructed.

## Standard Task Requirements

Each generated task should include:

- Summary
- Goal
- Background
- Scope
- Deliverables
- Technical Requirements
- Files Allowed
- Files Forbidden
- Dependencies
- Acceptance Criteria
- Testing
- Risks
- Definition of Done
- References
- AI Constraints

## Default Files Allowed

```txt
packages/atlas-runtime/**
```

For Sprint 004 backend runtime tasks, use the existing local convention if nearby tasks use `atlas-runtime/**` instead of `packages/atlas-runtime/**`.

## Default Files Forbidden

```txt
apps/**
plugins/**
node_modules/**
dist/**
build/**
```

## Codex Prompt

```txt
Read:
- START_HERE.md
- AGENTS.md
- CONSTITUTION.md
- DO_NOT_BREAK.md
- tasks/README.md
- tasks/templates/TASK_TEMPLATE.md
- tasks/SPRINT-004-backend/README.md if it exists
- tasks/SPRINT-004-backend/EPIC-026-atlas-runtime/README.md or EPIC.md if it exists
- tasks/SPRINT-004-backend/EPIC-026-atlas-runtime/TASK_PLAN.md

Generate or complete the next missing task file from TASK_PLAN.md.
Use the same structure, tone, metadata style, and level of detail as nearby existing task files.
Do not implement production code.
Only write or update the requested task document.
Do not modify files outside tasks/SPRINT-004-backend/EPIC-026-atlas-runtime/ unless explicitly allowed.
When finished, report:
- task file created or updated
- task title
- dependencies
- anything unclear
```

## Notes

- Keep every task small, independent, testable, reviewable, and traceable.
- Do not expand task scope beyond the selected task.
- Do not generate multiple task files unless explicitly instructed.
- Prefer existing task naming and numbering already present in this folder.
