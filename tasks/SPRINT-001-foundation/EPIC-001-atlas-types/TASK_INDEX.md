---
id: TASK_INDEX
epic: EPIC-001
package: atlas-types
version: 1.0
---

---

# EPIC-001 Task Index

## Overview

This document tracks every task included in **EPIC-001 — Atlas Types**.

The index serves as the single source of truth for sprint progress.

---

# Progress

| Phase         |   Progress |
| ------------- | ---------: |
| Foundation    |      0 / 4 |
| Domain Models |     0 / 17 |
| Integration   |      0 / 4 |
| **Overall**   | **0 / 25** |

---

# Phase 1 — Foundation

| ID        | Task               | Priority | Story | Status  | Depends On |
| --------- | ------------------ | -------- | ----- | ------- | ---------- |
| TASK-0001 | Initialize Package | Critical | 2     | Ready   | -          |
| TASK-0002 | Common Types       | Critical | 3     | Planned | TASK-0001  |
| TASK-0003 | Geometry Types     | High     | 2     | Planned | TASK-0002  |
| TASK-0004 | Shared Enums       | High     | 2     | Planned | TASK-0002  |

---

# Phase 2 — Domain Models

| ID        | Task              | Priority | Story | Status  | Depends On |
| --------- | ----------------- | -------- | ----- | ------- | ---------- |
| TASK-0005 | Workspace Types   | Critical | 3     | Planned | TASK-0004  |
| TASK-0006 | Project Types     | Critical | 3     | Planned | TASK-0005  |
| TASK-0007 | Page Types        | High     | 3     | Planned | TASK-0006  |
| TASK-0008 | Layer Types       | High     | 2     | Planned | TASK-0007  |
| TASK-0009 | Bubble Types      | Critical | 5     | Planned | TASK-0008  |
| TASK-0010 | Translation Types | High     | 3     | Planned | TASK-0009  |
| TASK-0011 | Style Types       | High     | 3     | Planned | TASK-0010  |
| TASK-0012 | Font Types        | Medium   | 2     | Planned | TASK-0011  |
| TASK-0013 | Asset Types       | Medium   | 2     | Planned | TASK-0012  |
| TASK-0014 | Image Types       | Medium   | 2     | Planned | TASK-0013  |
| TASK-0015 | Plugin Types      | Medium   | 3     | Planned | TASK-0014  |
| TASK-0016 | Workflow Types    | Medium   | 2     | Planned | TASK-0015  |
| TASK-0017 | History Types     | Medium   | 2     | Planned | TASK-0016  |
| TASK-0018 | Editor Types      | High     | 4     | Planned | TASK-0017  |
| TASK-0019 | Selection Types   | Medium   | 2     | Planned | TASK-0018  |
| TASK-0020 | Canvas Types      | Medium   | 3     | Planned | TASK-0019  |
| TASK-0021 | Export Types      | Medium   | 2     | Planned | TASK-0020  |

---

# Phase 3 — Integration

| ID        | Task                   | Priority | Story | Status  | Depends On |
| --------- | ---------------------- | -------- | ----- | ------- | ---------- |
| TASK-0022 | Public API             | Critical | 2     | Planned | TASK-0021  |
| TASK-0023 | Package Documentation  | Medium   | 2     | Planned | TASK-0022  |
| TASK-0024 | Package Testing        | High     | 3     | Planned | TASK-0023  |
| TASK-0025 | Review & Release Ready | Critical | 1     | Planned | TASK-0024  |

---

# Milestone

| Milestone            | Requirement           |
| -------------------- | --------------------- |
| Foundation Complete  | TASK-0001 → TASK-0004 |
| Domain Complete      | TASK-0005 → TASK-0021 |
| Integration Complete | TASK-0022 → TASK-0025 |
| EPIC Complete        | All tasks completed   |

---

# Current Task

TASK-0001 — Initialize Package

---

# Next Task

TASK-0002 — Common Types

---

# Notes

Tasks should be completed sequentially unless dependencies explicitly allow parallel implementation.

No task should begin until all prerequisite tasks are complete.
