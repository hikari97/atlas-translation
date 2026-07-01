---
title: Current Development Context
version: 1.0
last_updated: 2026-07-01
---

---

# Current Development Context

## Current Sprint

Sprint-001

Foundation Packages

---

## Current Epic

EPIC-001

Atlas Types

---

## Current Task

TASK-0001

Initialize atlas-types Package

Status: Ready

---

# Goal

Create the initial structure of the `atlas-types` package.

Only initialize the package.

Do not implement domain models.

---

# Current Package

packages/atlas-types

---

# Allowed Files

```text
packages/atlas-types/**
```

---

# Forbidden Files

```text
apps/**

plugins/**

schemas/**

packages/atlas-document/**

packages/atlas-command/**

packages/atlas-events/**

packages/atlas-core/**
```

---

# Acceptance Criteria

- Package builds successfully.
- TypeScript strict mode enabled.
- Zero runtime dependencies.
- Public API exports successfully.
- ESM build generated.
- CommonJS build generated.
- Declaration files generated.

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

8. tasks/sprint-001/README.md

9. tasks/sprint-001/EPIC-001-atlas-types/README.md

10. tasks/sprint-001/EPIC-001-atlas-types/TASK-0001.md

---

# Implementation Rules

- Implement ONLY the current task.
- Do not implement future tasks.
- Do not modify unrelated files.
- Respect package boundaries.
- Keep implementation production-ready.
- Use strict TypeScript.
- Keep zero runtime dependencies.

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

TASK-0002

Implement Common Types

Do NOT implement this task yet.
