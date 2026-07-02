# Package Dependency Graph

> **Status:** Draft
>
> **Version:** 1.0.0
>
> **Last Updated:** 2026-07-01

---

# Purpose

This document defines the dependency architecture of Atlas Studio.

Every package MUST follow these dependency rules.

The objectives are:

- Prevent circular dependencies
- Maintain clean architecture
- Enforce package boundaries
- Simplify testing
- Improve maintainability
- Support long-term scalability

---

# High-Level Dependency Graph

```text
                    +------------------+
                    |   atlas-types    |
                    +------------------+
                              ▲
                              │
                     implements contracts
                              │
                              ▼
                 +--------------------------+
                 |     atlas-document       |
                 |  Document Object Model   |
                 +--------------------------+
                      ▲                 ▲
                      │                 │
             mutate document      publish events
                      │                 │
                      ▼                 ▼
             +---------------+   +---------------+
             | atlas-command |   | atlas-events  |
             +---------------+   +---------------+
                     ▲               ▲
                     └───────┬───────┘
                             │
                             ▼
                    +------------------+
                    |    atlas-core    |
                    +------------------+
                             ▲
                             │
                    used by applications
                             │
                             ▼
               +---------------------------+
               |         Apps              |
               +---------------------------+
                             ▲
                             │
                       extension points
                             │
                             ▼
               +---------------------------+
               |         Plugins           |
               +---------------------------+
```

---

# Development Order

Packages must be implemented in the following order.

```text
EPIC-001

atlas-types

↓

EPIC-002

atlas-document

↓

EPIC-003

atlas-command

↓

EPIC-004

atlas-events

↓

EPIC-005

atlas-core

↓

Applications

↓

Plugins
```

Later packages may depend on earlier packages.

Earlier packages MUST NEVER depend on later packages.

---

# Dependency Matrix

| Package        | Allowed Dependencies                                     |
| -------------- | -------------------------------------------------------- |
| atlas-types    | None                                                     |
| atlas-document | atlas-types                                              |
| atlas-command  | atlas-types, atlas-document                              |
| atlas-events   | atlas-types, atlas-document                              |
| atlas-core     | atlas-types, atlas-document, atlas-command, atlas-events |
| Apps           | All packages                                             |
| Plugins        | Public APIs only                                         |

---

# Forbidden Dependencies

## atlas-types

Must NOT depend on:

- atlas-document
- atlas-command
- atlas-events
- atlas-core
- Apps
- Plugins

---

## atlas-document

Must NOT depend on:

- atlas-command
- atlas-events
- atlas-core
- Apps
- Plugins

---

## atlas-command

Must NOT depend on:

- atlas-events
- atlas-core
- Apps
- Plugins

---

## atlas-events

Must NOT depend on:

- atlas-command
- atlas-core
- Apps
- Plugins

---

## atlas-core

Must NOT depend on:

- Apps
- Plugins

---

# Layer Responsibilities

## atlas-types

Responsibilities

- Interfaces
- Types
- Enums
- Constants
- DTOs
- Contracts
- Shared utility types

Must NOT contain

- Business logic
- State
- Services
- Commands
- Events

---

## atlas-document

Responsibilities

- Document Object Model
- Aggregate Roots
- Collections
- Traversal
- Snapshot
- Diff
- Serialization contracts
- Mutation contracts

Must NOT contain

- OCR
- Rendering
- AI
- Translation engines
- Validation rules
- Undo/Redo
- Event bus

---

## atlas-command

Responsibilities

- Command Pattern
- Transactions
- Undo
- Redo
- Macro Commands
- Command Queue
- Command History

Must NOT contain

- OCR
- Rendering
- AI
- Translation
- Event Bus

---

## atlas-events

Responsibilities

- Domain Events
- Event Bus
- Event Dispatching
- Event Subscription
- Event Middleware

Must NOT contain

- Commands
- Rendering
- OCR
- Business logic

---

## atlas-core

Responsibilities

- OCR
- Bubble Detection
- Translation
- Rendering
- Typography
- AI Integration
- Export
- Import
- Validation
- Business Rules
- Application Services

Must NOT contain

- UI
- Framework-specific code

---

## Applications

Responsibilities

- User Interface
- Routing
- State Management
- Platform Integration

Must NOT contain

- Core business logic

---

## Plugins

Responsibilities

- Extend Atlas Studio
- Add Commands
- Add Services
- Add AI Providers
- Add Exporters
- Add Importers

Must communicate only through public APIs.

---

# Dependency Rules

Every dependency must point downward.

Allowed

```text
atlas-core
        │
        ▼
atlas-command
        │
        ▼
atlas-document
        │
        ▼
atlas-types
```

Forbidden

```text
atlas-types
      ▲
      │
atlas-core
```

---

# Package Communication

Packages communicate only through public APIs.

```text
Good

atlas-core
        │
        ▼
@atlas/document

Bad

atlas-core
        │
        ▼
../atlas-document/src/internal/*
```

Internal folders must never be imported.

---

# Public API Rule

Every package exposes only:

```text
src/index.ts
```

Optional subpath exports:

```text
@atlas/document/project

@atlas/document/page

@atlas/document/traversal

@atlas/document/collection
```

Private folders are never imported directly.

---

# Circular Dependency Policy

Circular dependencies are prohibited.

Forbidden

```text
atlas-command
        │
        ▼
atlas-events
        ▲
        │
        └──────────
```

Allowed

```text
atlas-command
        │
        ▼
atlas-document
        │
        ▼
atlas-types
```

---

# Architecture Principles

The Atlas Studio architecture follows these principles:

- Clean Architecture
- Domain-Driven Design (DDD)
- Single Responsibility Principle
- Dependency Inversion Principle
- Composition over Inheritance
- Explicit Package Boundaries
- Stable Public APIs
- Immutable Contracts
- Modular Design

---

# Architecture Review Checklist

Before introducing a new dependency, verify:

- [ ] Does it create a circular dependency?
- [ ] Does it violate package responsibilities?
- [ ] Is the dependency truly required?
- [ ] Can the dependency be inverted?
- [ ] Is there an existing public API?
- [ ] Is this dependency documented?

If any answer is **No**, the dependency should be reviewed before implementation.

---

# Summary

The dependency graph defines the foundation of Atlas Studio.

All packages MUST follow these rules.

Violating these dependency rules may introduce:

- Circular dependencies
- Tight coupling
- Unclear package responsibilities
- Reduced maintainability
- Increased implementation complexity

Every architectural change should be reviewed against this document before being accepted.
