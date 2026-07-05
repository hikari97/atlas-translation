---
title: Current Development Context
version: 1.0
last_updated: 2026-07-05
---

---

# Current Development Context

## Current Sprint

Sprint-005

Frontend Application

---

## Current Epic

EPIC-045

Workspace Dashboard UI

---

## Current Task

TASK-001

Dashboard Route

Status: Ready

---

# Goal

Implement the workspace dashboard page route and metrics UI inside apps/web.

---

# Current Package

apps/web

---

# Allowed Files

```text
apps/web/**
```

---

# Forbidden Files

```text
apps/**

plugins/**

schemas/**

packages/atlas-http/**

packages/atlas-router/**

packages/atlas-request/**

packages/atlas-response/**

apps/web/src/pages/index.tsx

packages/atlas-container/**

packages/atlas-database/**
```

---

# Acceptance Criteria

- Dashboard route configured.
- Dashboard cards and layout implemented.
- Recent projects table rendered.
- TypeScript strict mode passes.

---

# References

Read before implementation:

1. docs/README.md

2. docs/00-overview/PRODUCT.md

3. CONSTITUTION.md

4. DECISIONS.md

5. docs/00-overview/FEATURE_MATRIX.md

6. packages/README.md

7. tasks/README.md

8. tasks/SPRINT-005-frontend/EPIC-045-web-app-foundation/TASK-009-web-loading-empty-states.md

---

# Implementation Rules

- Implement ONLY the current task.
- Do not implement future tasks.
- Do not modify unrelated files.
- Respect package boundaries.
- Keep implementation production-ready.
- Use strict TypeScript.
- Keep provider independence.

---

# Definition of Done

The task is complete when:

- All acceptance criteria are satisfied.
- Build succeeds.
- Public API works.
- Documentation is updated if necessary.
- Ready for review.

---

# Next Task

TASK-002

Dashboard Summary Cards

Do NOT implement this task yet.
