---
id: SPRINT-004-TASK-PLAN
title: Backend Runtime Sprint Task Plan
status: Draft
sprint: SPRINT-004
owner: H.Makki
created_at: 2026-07-05
updated_at: 2026-07-05
---

# SPRINT-004 — Backend Runtime TASK_PLAN

## Purpose

This file gives Codex a sprint-level map of all Epic task plans.

It should be used to locate the correct Epic `TASK_PLAN.md`, not to implement work directly.

## Sprint Summary

Build backend runtime foundation, starting with atlas-runtime as the root runtime abstraction for backend applications, workers, CLI, and future hosts.

## Epic Plans

| Epic | Directory | Package | Purpose |
|---|---|---|---|
| EPIC-026 | `EPIC-026-atlas-runtime/TASK_PLAN.md` | `atlas-runtime` | Atlas Runtime task generation plan |

## Codex Sprint Workflow

```txt
Read START_HERE.md, AGENTS.md, CONSTITUTION.md, DO_NOT_BREAK.md, and tasks/README.md.
Then open this sprint TASK_PLAN.md.
Choose the requested Epic only.
Open that Epic's TASK_PLAN.md.
Generate or complete exactly one TASK-*.md file.
Do not implement production code while generating task documents.
Do not continue to another task without explicit instruction.
```

## Rules

- This sprint plan is only an index.
- Epic `TASK_PLAN.md` files contain the detailed task sequence.
- Existing task files should not be overwritten unless the user explicitly asks.
- If a task file already exists and is non-empty, Codex should update only missing sections.
- If a task file exists but is empty, Codex may fill it using the Epic task plan.
