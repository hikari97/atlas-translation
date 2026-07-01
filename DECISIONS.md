---
title: Engineering Decisions
version: 1.0
status: Active
owner: H.Makki
last_updated: 2026-07-01
---

---

# Engineering Decisions

## Purpose

This document records significant architectural and engineering decisions made throughout the development of Atlas Studio.

Its purpose is to explain **why** a decision was made, preventing repeated discussions and helping future contributors understand the project's direction.

Every major decision should be documented here before implementation.

---

# Decision Format

Each decision should follow the format below.

```text
Decision ID

Status

Date

Decision

Context

Alternatives Considered

Reason

Consequences

Related Documents
```

---

# Decision-001

**Status**

Accepted

**Date**

2026-07-01

**Decision**

Atlas Studio will use a Monorepo architecture.

**Context**

The project contains multiple applications, reusable packages, AI workers, plugins, and shared documentation.

**Alternatives Considered**

- Multiple repositories
- Git submodules

**Reason**

A monorepo simplifies dependency management, shared types, code reuse, versioning, and AI-assisted development.

**Consequences**

- Easier package sharing
- Centralized documentation
- Unified build system

---

# Decision-002

**Status**

Accepted

**Date**

2026-07-01

**Decision**

Business logic belongs inside reusable packages.

**Reason**

Applications should remain lightweight and focus on orchestration.

---

# Decision-003

**Status**

Accepted

**Decision**

Atlas Studio adopts a Plugin First Architecture.

**Reason**

OCR providers, translation engines, storage providers, exporters, and AI services should be replaceable without modifying the core application.

---

# Decision-004

**Status**

Accepted

**Decision**

Atlas Document is the single source of truth for all project data.

**Reason**

Every application should read and write the same document model.

---

# Decision-005

**Status**

Accepted

**Decision**

atlas-types must have zero runtime dependencies.

**Reason**

Shared domain models should remain lightweight and reusable across every package and application.

---

# Decision-006

**Status**

Accepted

**Decision**

TypeScript Strict Mode is mandatory.

**Reason**

Improves maintainability and reduces runtime errors.

---

# Decision-007

**Status**

Accepted

**Decision**

Documentation is part of the production code.

**Reason**

Documentation must evolve together with implementation.

---

# Decision-008

**Status**

Accepted

**Decision**

Every implementation must begin with a Task Specification.

**Reason**

Improves traceability, AI-assisted development, and code review.

---

# Decision-009

**Status**

Accepted

**Decision**

Packages expose functionality only through their public API.

**Reason**

Prevent coupling between packages and simplify refactoring.

---

# Decision-010

**Status**

Accepted

**Decision**

Atlas Studio uses non-destructive editing.

**Reason**

Original images and OCR results must always be recoverable.

---

# Decision-011

**Status**

Accepted

**Decision**

Bubble editing is independent from image editing.

**Reason**

Text editing and image restoration should remain separate responsibilities.

---

# Decision-012

**Status**

Accepted

**Decision**

AI providers must be implemented as plugins.

**Reason**

Atlas Studio must remain provider-independent and future-proof.

---

# Future Decisions

Future architectural decisions should continue using the same template.

Never overwrite historical decisions.

If circumstances change, create a new decision instead of modifying an old one.

---

# Related Documents

- CONSTITUTION.md
- README.md
- docs/01-architecture/
- docs/06-plugin/
- tasks/
