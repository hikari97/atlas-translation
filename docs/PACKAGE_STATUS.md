# Atlas Studio — Package Status

**Last Updated:** 2026-07-01

---

# Overview

This document provides a high-level overview of the implementation status of every package in the Atlas Studio monorepo.

It serves as the primary dashboard for tracking engineering progress, package maturity, and release readiness.

---

# Legend

| Status         | Meaning                                     |
| -------------- | ------------------------------------------- |
| ⏳ Not Started | Package has not entered active development. |
| 🚧 In Progress | Package is currently under development.     |
| 👀 Review      | Engineering review is in progress.          |
| ✅ Complete    | Package implementation is complete.         |
| 🚀 Released    | Package has been versioned and released.    |

---

# Package Roadmap

| Epic     | Package         | Status         | Progress | Release |
| -------- | --------------- | -------------- | -------: | ------- |
| EPIC-001 | atlas-types     | ✅ Complete    |  30 / 30 | Pending |
| EPIC-002 | atlas-document  | ✅ Complete    |  30 / 30 | Pending |
| EPIC-003 | atlas-command   | ✅ Complete    |  30 / 30 | Pending |
| EPIC-004 | atlas-events    | ✅ Complete    |  30 / 30 | Pending |
| EPIC-005 | atlas-core      | ⏳ Not Started |   0 / 30 | —       |
| EPIC-006 | atlas-plugin    | ⏳ Not Started |   0 / 30 | —       |
| EPIC-007 | atlas-renderer  | ⏳ Not Started |   0 / 30 | —       |
| EPIC-008 | atlas-ui        | ⏳ Not Started |   0 / 30 | —       |
| EPIC-009 | atlas-workspace | ⏳ Not Started |   0 / 30 | —       |
| EPIC-010 | atlas-cli       | ⏳ Not Started |   0 / 30 | —       |

---

# Overall Progress

| Metric         | Value |
| -------------- | ----: |
| Total Packages |    10 |
| Completed      |     4 |
| In Progress    |     0 |
| Remaining      |     6 |

Overall Progress

```text
████████░░░░░░░░░░░░░░░░ 40%
```

---

# Dependency Order

Packages should be implemented in the following order.

```text
atlas-types
        │
        ▼
atlas-document
        │
        ▼
atlas-command
        │
        ▼
atlas-events
        │
        ▼
atlas-core
        │
        ├──────────────┐
        ▼              ▼
atlas-plugin     atlas-renderer
        │              │
        └──────┬───────┘
               ▼
           atlas-ui
               │
               ▼
        atlas-workspace
               │
               ▼
           atlas-cli
```

---

# Current Focus

Current Package

```
EPIC-005 — atlas-core
```

Status

```
Ready to Start
```

Estimated Tasks

```
30 Tasks
```

---

# Completed Milestones

## EPIC-001 — atlas-types

Status

```
Completed
```

Tasks

```
30 / 30
```

---

## EPIC-002 — atlas-document

Status

```
Completed
```

Tasks

```
30 / 30
```

---

## EPIC-003 — atlas-command

Status

```
Completed
```

Tasks

```
30 / 30
```

---

## EPIC-004 — atlas-events

Status

```
Completed
```

Tasks

```
30 / 30
```

---

# Release Readiness

| Package        | Documentation | Testing | Review | Release |
| -------------- | ------------- | ------- | ------ | ------- |
| atlas-types    | ✅            | ✅      | ✅     | Pending |
| atlas-document | ✅            | ✅      | ✅     | Pending |
| atlas-command  | ✅            | ✅      | ✅     | Pending |
| atlas-events   | ✅            | ✅      | ✅     | Pending |

---

# Engineering Metrics

| Metric              | Value |
| ------------------- | ----: |
| Completed Tasks     |   120 |
| Remaining Tasks     |   180 |
| Total Planned Tasks |   300 |

---

# Next Milestone

```
EPIC-005

Package:
atlas-core

Status:
Ready

Estimated Tasks:
30
```

---

# Notes

This document should be updated whenever:

- A new EPIC starts.
- A task is completed.
- A package enters review.
- A package is released.
- The roadmap changes.

This file acts as the primary engineering dashboard for the Atlas Studio monorepo.
