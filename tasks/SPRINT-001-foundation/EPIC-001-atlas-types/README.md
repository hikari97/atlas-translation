---
id: EPIC-001
title: Atlas Types
status: Planned
priority: Critical

sprint: SPRINT-001

package: atlas-types

owner: H.Makki

created_at: 2026-07-01
updated_at: 2026-07-01
---

---

# EPIC-001 — Atlas Types

## Overview

The `atlas-types` package is the foundation of the Atlas Studio platform.

It defines the shared domain model used by every package, application, plugin, and service.

This package contains **only type definitions** and should have **zero runtime dependencies**.

No business logic, framework-specific code, or runtime behavior should exist in this package.

---

# Goal

Create a reusable, framework-independent TypeScript package containing all shared domain models used throughout Atlas Studio.

---

# Objectives

- Define common primitive types.
- Define shared geometry types.
- Define reusable enums.
- Define all domain models.
- Provide a stable public API.
- Maintain zero runtime dependencies.

---

# Scope

Included:

- Shared Types
- Domain Interfaces
- Enums
- Value Objects
- Public API

Excluded:

- Business Logic
- Validation
- Serialization
- UI Components
- Database Models
- Network Code

---

# Package Structure

```text id="kt6a9s"
packages/

atlas-types/

src/

common/
geometry/
workspace/
project/
page/
layer/
bubble/
translation/
style/
font/
asset/
image/
plugin/
workflow/
history/
editor/
selection/
canvas/
export/

index.ts
```

---

# Development Phases

## Phase 1 — Foundation

| Task      | Description        |
| --------- | ------------------ |
| TASK-0001 | Initialize Package |
| TASK-0002 | Common Types       |
| TASK-0003 | Geometry Types     |
| TASK-0004 | Shared Enums       |

---

## Phase 2 — Domain Models

| Task      | Description       |
| --------- | ----------------- |
| TASK-0005 | Workspace Types   |
| TASK-0006 | Project Types     |
| TASK-0007 | Page Types        |
| TASK-0008 | Layer Types       |
| TASK-0009 | Bubble Types      |
| TASK-0010 | Translation Types |
| TASK-0011 | Style Types       |
| TASK-0012 | Font Types        |
| TASK-0013 | Asset Types       |
| TASK-0014 | Image Types       |
| TASK-0015 | Plugin Types      |
| TASK-0016 | Workflow Types    |
| TASK-0017 | History Types     |
| TASK-0018 | Editor Types      |
| TASK-0019 | Selection Types   |
| TASK-0020 | Canvas Types      |
| TASK-0021 | Export Types      |

---

## Phase 3 — Integration

| Task      | Description            |
| --------- | ---------------------- |
| TASK-0022 | Public API             |
| TASK-0023 | Package Documentation  |
| TASK-0024 | Package Testing        |
| TASK-0025 | Review & Release Ready |

---

# Deliverables

At the completion of this Epic, the package should provide:

- Shared primitive types
- Shared geometry types
- Shared enums
- Workspace models
- Project models
- Page models
- Bubble models
- Translation models
- Editor models
- Plugin models
- Public API
- TypeScript declarations

---

# Dependencies

This package must not depend on:

- React
- Node.js APIs
- Electron
- Browser APIs
- Other Atlas packages

Allowed dependencies:

- TypeScript (development)
- tsup (build tooling)
- ESLint (development)

Zero runtime dependencies are required.

---

# Success Criteria

The Epic is complete when:

- All tasks are completed.
- Public API is stable.
- Package builds successfully.
- Declaration files are generated.
- Zero runtime dependencies remain.
- Documentation is updated.
- Code review is approved.

---

# Risks

Potential risks include:

- Circular type dependencies
- Overly coupled domain models
- Breaking changes to shared types
- Scope expansion

---

# Definition of Done

- All implementation tasks completed.
- Build passes.
- TypeScript passes.
- Public API exported.
- Documentation updated.
- Review approved.

---

# Related Documents

- PRODUCT.md
- CONSTITUTION.md
- DECISIONS.md
- FEATURE_MATRIX.md
- packages/README.md
- tasks/README.md

---

`atlas-types` is the foundational package of Atlas Studio.

Every other package depends on the correctness, stability, and maintainability of this package.
