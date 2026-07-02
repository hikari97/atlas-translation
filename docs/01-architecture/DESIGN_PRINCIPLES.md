# Design Principles

> **Status:** Draft
>
> **Version:** 1.0.0
>
> **Last Updated:** 2026-07-01

---

# Purpose

This document defines the software design principles adopted by Atlas Studio.

Every architectural decision, package, module, and implementation should align with these principles.

When a design decision conflicts with these principles, an Architecture Decision Record (ADR) is required.

---

# Core Philosophy

Atlas Studio is designed as:

- Modular
- Strongly Typed
- Domain-Oriented
- Extensible
- Testable
- Maintainable
- AI-Friendly

Architecture always takes precedence over implementation speed.

---

# Principle 1 — Single Responsibility Principle (SRP)

Each package, class, and module should have one primary responsibility.

Good

```text
atlas-document
↓

Document Model
```

Bad

```text
atlas-document

↓

Document Model

↓

OCR

↓

Rendering
```

---

# Principle 2 — Explicit Package Boundaries

Every package owns a clearly defined responsibility.

Packages communicate only through public APIs.

Internal implementation must remain private.

---

# Principle 3 — Dependency Direction

Dependencies always point toward lower-level abstractions.

```text
atlas-core

↓

atlas-command

↓

atlas-document

↓

atlas-types
```

Never reverse this direction.

---

# Principle 4 — Composition Over Inheritance

Prefer composition.

Good

```text
Project

↓

PageCollection

↓

Page
```

Avoid deep inheritance hierarchies.

---

# Principle 5 — Strong Typing

Everything should be strongly typed.

Avoid

```ts
any;
```

Prefer

```ts
DocumentCollection<PageDocument>;
```

Type safety is preferred over convenience.

---

# Principle 6 — Public API First

Every package exposes only stable public APIs.

Never expose internal modules.

Good

```ts
import { PageDocument } from '@atlas/document';
```

Bad

```ts
import { PageDocument } from '@atlas/document/src/internal/PageDocument';
```

---

# Principle 7 — Immutable Contracts

Contracts should be immutable.

Interfaces define behavior.

Implementations manage state.

Contracts must remain stable.

---

# Principle 8 — Encapsulation

Internal state should never be modified directly.

Expose behavior instead.

Good

```ts
project.addPage(page);
```

Avoid

```ts
project.pages.push(page);
```

---

# Principle 9 — Domain-Oriented Design

Packages represent domains.

Examples

```text
atlas-document

↓

Document Model

atlas-command

↓

Command System

atlas-events

↓

Event System
```

Avoid utility-driven architecture.

---

# Principle 10 — Separation of Concerns

Each layer solves one problem.

| Layer          | Responsibility |
| -------------- | -------------- |
| atlas-types    | Contracts      |
| atlas-document | Document Model |
| atlas-command  | Commands       |
| atlas-events   | Events         |
| atlas-core     | Business Logic |
| Apps           | User Interface |

Responsibilities should never overlap.

---

# Principle 11 — Fail Fast

Errors should be detected as early as possible.

Prefer throwing meaningful exceptions over silently ignoring problems.

---

# Principle 12 — Readability First

Readable code is preferred over clever code.

Code is written for humans first.

---

# Principle 13 — Convention Over Configuration

Prefer predictable conventions instead of excessive configuration.

Developers should not have to guess where code belongs.

---

# Principle 14 — Extensibility

The architecture should allow new features without modifying existing packages.

Examples

- New OCR provider
- New AI provider
- New exporter
- New plugin

Should be added through extension points.

---

# Principle 15 — Open/Closed Principle

Software entities should be:

Open for extension.

Closed for modification.

New behavior should be added without rewriting existing modules.

---

# Principle 16 — Interface Segregation

Prefer many focused interfaces instead of large generic interfaces.

Good

```text
Serializer

Deserializer

SnapshotFactory
```

Avoid

```text
DocumentManager
```

that performs unrelated responsibilities.

---

# Principle 17 — Dependency Inversion

High-level modules should depend on abstractions.

Never depend directly on implementation details.

---

# Principle 18 — Testability

Every component should be testable in isolation.

Favor constructor injection and explicit dependencies.

Avoid hidden global state.

---

# Principle 19 — AI-Friendly Architecture

The project is designed to be implemented collaboratively with AI assistants.

Therefore:

- Clear package boundaries
- Small focused modules
- Stable APIs
- Predictable naming
- Comprehensive documentation

are considered architectural requirements.

---

# Principle 20 — Documentation as Architecture

Documentation is part of the architecture.

Architecture is not complete until it is documented.

Every significant architectural decision should be recorded.

---

# Design Hierarchy

Architecture decisions follow this priority:

```text
Vision

↓

Product

↓

Architecture

↓

ADR

↓

Package Design

↓

Implementation

↓

Testing
```

Implementation must never redefine architecture.

---

# Anti-Patterns

Avoid:

- Circular dependencies
- God classes
- God packages
- Utility dumping
- Hidden side effects
- Global mutable state
- Tight coupling
- Deep inheritance
- Feature leakage between packages

---

# Architecture Checklist

Before implementing a feature, verify:

- [ ] Does it belong in this package?
- [ ] Does it respect package boundaries?
- [ ] Does it introduce a new dependency?
- [ ] Does it expose unnecessary APIs?
- [ ] Is it strongly typed?
- [ ] Is it testable?
- [ ] Is it documented?

---

# Summary

Atlas Studio prioritizes architecture over implementation.

These principles ensure:

- Long-term maintainability
- Clear responsibilities
- Stable public APIs
- Predictable package structure
- High-quality AI-assisted development

Every contributor should understand and follow these principles before implementing new functionality.
