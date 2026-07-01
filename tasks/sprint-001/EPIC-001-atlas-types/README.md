---
title: EPIC-001 Atlas Types
version: 1.0
status: Planned
---

---

# EPIC-001 — Atlas Types

## Goal

Create the shared domain model package used throughout Atlas Studio.

This package defines all shared interfaces, types, enums, and value objects used by every application and package.

---

# Responsibilities

- Shared Interfaces
- Domain Models
- Enums
- Constants
- Value Objects

---

# Deliverables

- Workspace Types
- Project Types
- Page Types
- Bubble Types
- Translation Types
- Style Types
- Plugin Types

---

# Dependencies

None.

This package must remain dependency-free.

---

# Included Tasks

| Task      | Description       |
| --------- | ----------------- |
| TASK-0001 | Setup Package     |
| TASK-0002 | Common Types      |
| TASK-0003 | Document Types    |
| TASK-0004 | Translation Types |
| TASK-0005 | Public API        |

---

# Definition of Done

This epic is complete when:

- All shared types are implemented.
- No runtime dependency exists.
- Public API is exported.
- Documentation is complete.

---

EPIC-001 is the foundation for every other package in Atlas Studio.
