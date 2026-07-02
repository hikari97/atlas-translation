# ADR-0002

# Package Dependency Rules

> **Status:** Accepted
>
> **Date:** 2026-07-01
>
> **Deciders:** Atlas Studio Architecture Team

---

# Context

Atlas Studio is designed as a modular TypeScript monorepo composed of multiple independent packages.

Examples include:

- atlas-types
- atlas-document
- atlas-command
- atlas-events
- atlas-core

As the project grows, uncontrolled dependencies between packages may introduce:

- Circular dependencies
- Tight coupling
- Difficult testing
- Unclear ownership
- Complex release management

To ensure long-term maintainability, package dependencies must follow a strict architecture.

---

# Problem

Without explicit dependency rules, developers may accidentally create relationships such as:

```text
atlas-document
        ▲
        │
atlas-core
```

or

```text
atlas-command
        ▲
        │
atlas-events
```

These dependencies make packages harder to evolve independently.

---

# Decision

Atlas Studio adopts a **layered dependency architecture**.

Dependencies always point from higher-level packages to lower-level packages.

A package may depend only on packages located below it.

The dependency graph is fixed unless superseded by a future ADR.

---

# Official Dependency Graph

```text
                    atlas-types
                          ▲
                          │
                    Contracts
                          │
                          ▼
                  atlas-document
                 Document Object Model
                    ▲           ▲
                    │           │
                    │           │
             atlas-command   atlas-events
                    ▲           ▲
                    └─────┬─────┘
                          │
                          ▼
                     atlas-core
                          ▲
                          │
                    Applications
                          ▲
                          │
                        Plugins
```

---

# Allowed Dependencies

| Package        | Allowed Dependencies                                     |
| -------------- | -------------------------------------------------------- |
| atlas-types    | None                                                     |
| atlas-document | atlas-types                                              |
| atlas-command  | atlas-types, atlas-document                              |
| atlas-events   | atlas-types, atlas-document                              |
| atlas-core     | atlas-types, atlas-document, atlas-command, atlas-events |
| Applications   | All packages                                             |
| Plugins        | Public APIs only                                         |

---

# Forbidden Dependencies

## atlas-types

Must never depend on:

- atlas-document
- atlas-command
- atlas-events
- atlas-core
- Applications
- Plugins

---

## atlas-document

Must never depend on:

- atlas-command
- atlas-events
- atlas-core
- Applications
- Plugins

---

## atlas-command

Must never depend on:

- atlas-events
- atlas-core
- Applications
- Plugins

---

## atlas-events

Must never depend on:

- atlas-command
- atlas-core
- Applications
- Plugins

---

## atlas-core

Must never depend on:

- Applications
- Plugins

---

# Public API Rule

Packages communicate exclusively through public APIs.

Allowed

```ts
import { PageDocument } from '@atlas/document';
```

Allowed

```ts
import { DocumentCollection } from '@atlas/document/collection';
```

Forbidden

```ts
import { PageDocument } from '@atlas/document/src/page/PageDocument';
```

Internal implementation details must never be imported by another package.

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
        └──────────────
```

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

---

# Dependency Inversion

High-level packages depend on abstractions exposed by lower-level packages.

Examples

Good

```text
atlas-core
        │
        ▼
Document interfaces
```

Bad

```text
atlas-core
        │
        ▼
Internal implementation
```

---

# Package Responsibilities

## atlas-types

Provides:

- Interfaces
- Types
- Enums
- Shared Contracts

Must not contain:

- State
- Business Logic
- Services

---

## atlas-document

Provides:

- Document Object Model
- Collections
- Traversal
- Snapshot
- Diff
- Mutation
- Serialization Contracts

Must not contain:

- OCR
- Translation
- Rendering
- AI
- Validation
- Commands
- Event Bus

---

## atlas-command

Provides:

- Command Pattern
- Transactions
- Undo / Redo
- Macro Commands
- Command History

Must not contain:

- OCR
- Rendering
- Translation
- Event Dispatching

---

## atlas-events

Provides:

- Domain Events
- Event Bus
- Event Dispatcher
- Event Subscription

Must not contain:

- Business Logic
- Commands
- Rendering

---

## atlas-core

Provides:

- OCR
- Bubble Detection
- Translation
- Rendering
- Typography
- Import
- Export
- Validation
- AI Integration
- Business Services

Must not contain:

- UI
- Framework-specific components

---

# Rationale

This architecture provides:

- Clear ownership
- Stable package boundaries
- Reduced coupling
- Easier testing
- Predictable dependency graph
- Independent package evolution
- Better AI-assisted implementation

---

# Consequences

## Positive

- No circular dependencies.
- Easier refactoring.
- Stable public APIs.
- Independent package testing.
- Clear architectural boundaries.
- Better scalability.

## Negative

- Additional abstraction layers.
- More planning before implementation.
- Some features require coordination across packages.

---

# Alternatives Considered

## Fully Connected Packages

Rejected.

Reason:

Every package could depend on every other package, creating tight coupling and making long-term maintenance difficult.

---

## Feature-Based Packages

Rejected.

Reason:

Feature-oriented packaging mixes domain responsibilities and weakens separation of concerns.

---

## Single Package Architecture

Rejected.

Reason:

A monolithic package would simplify the initial implementation but significantly reduce modularity, testability, and extensibility as the project grows.

---

# Compliance

Every new package must satisfy the following checklist:

- [ ] Dependencies follow the official dependency graph.
- [ ] No circular dependencies introduced.
- [ ] Package responsibility is clearly defined.
- [ ] Public APIs are used exclusively.
- [ ] Internal implementation remains private.
- [ ] Changes are documented if architectural rules are affected.

Any exception requires a new Architecture Decision Record (ADR).

---

# References

- PACKAGE_DEPENDENCY_GRAPH.md
- MONOREPO_STRUCTURE.md
- DESIGN_PRINCIPLES.md
- CODING_STANDARDS.md
- ADR-0001-use-monorepo.md
