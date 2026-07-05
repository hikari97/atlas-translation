# Atlas Studio — Package Status

**Last Updated:** 2026-07-05

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
| EPIC-005 | atlas-core      | ✅ Complete    |  24 / 24 | Pending |
| EPIC-006 | atlas-plugin    | ✅ Complete    |  18 / 18 | Pending |
| EPIC-007 | atlas-renderer  | ✅ Complete    |  18 / 18 | Pending |
| EPIC-008 | atlas-ui        | ✅ Complete    |  18 / 18 | Pending |
| EPIC-009 | atlas-workspace | ✅ Complete    |  18 / 18 | Pending |
| EPIC-024 | atlas-openapi   | ✅ Complete    |  18 / 18 | Pending |
| EPIC-025 | atlas-websocket | ✅ Complete    |  18 / 18 | Pending |
| EPIC-026 | atlas-runtime   | ⏳ Not Started |   0 / 18 | —       |

---

# Overall Progress

| Metric         | Value |
| -------------- | ----: |
| Total Packages |    28 |
| Completed      |    23 |
| In Progress    |     1 |
| Remaining      |     5 |

Overall Progress

```text
████████████████████░░░░ 82%
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
EPIC-026 — atlas-runtime
```

Status

```
Ready to Start TASK-001
```

Estimated Tasks

```
18 Tasks
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
| Completed Tasks     |   858 |
| Remaining Tasks     |   326 |
| Total Planned Tasks |  1184 |

---

# Next Milestone

```
EPIC-026

Package:
atlas-runtime

Status:
Ready to Start TASK-001

Estimated Tasks:
18
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
