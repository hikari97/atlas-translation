# EPIC-005 — atlas-core

> Build the core runtime foundation for the Atlas Studio Framework.

---

# Overview

The `atlas-core` package provides the runtime infrastructure shared by every Atlas Studio package.

Unlike previous packages, which define specialized frameworks such as commands and events, `atlas-core` establishes the application runtime itself.

It becomes the central coordination layer responsible for bootstrapping, dependency management, lifecycle management, configuration, environment abstraction, and common runtime services.

Every higher-level package depends on `atlas-core`.

---

# Objectives

The objectives of this epic are to:

- Build the Atlas Studio runtime foundation.
- Provide dependency injection infrastructure.
- Standardize application lifecycle management.
- Provide configuration abstractions.
- Define module and service registration.
- Support application bootstrapping.
- Provide runtime resource management.
- Standardize logging abstractions.
- Provide platform-independent runtime services.

---

# Scope

Included:

- Application runtime
- Bootstrap system
- Dependency injection
- Service container
- Module system
- Lifecycle management
- Configuration
- Environment
- Disposable resources
- Logging abstraction
- Clock abstraction
- Identifier generation
- Feature flags

Excluded:

- UI
- Rendering
- Plugins
- Workspace
- CLI
- Business logic

---

# Package Responsibilities

The `atlas-core` package is responsible for:

- Hosting shared runtime services.
- Managing application startup and shutdown.
- Providing dependency resolution.
- Managing modules.
- Providing runtime abstractions.
- Coordinating framework initialization.

The package is **not** responsible for:

- Commands
- Events
- Rendering
- User interface
- Plugin loading
- Domain logic

---

# Dependency Graph

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
```

Future packages:

```text
atlas-core
        │
        ├──────────────┐
        ▼              ▼
atlas-plugin   atlas-renderer
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

# Planned Components

The package will contain:

```text
Application

Bootstrap

Service Container

Dependency Injection

Service Provider

Module

Configuration

Environment

Lifecycle

Resource

Disposable

Logger

Clock

Identifier

Feature Flag
```

---

# Deliverables

By the end of this epic the package should provide:

- Stable runtime foundation.
- Public dependency injection API.
- Application lifecycle.
- Configuration framework.
- Module infrastructure.
- Public runtime services.
- Stable package exports.
- Complete documentation.
- Complete test suite.
- Release-ready package.

---

# Milestones

| Phase               | Tasks |
| ------------------- | ----: |
| Foundation          |     5 |
| Infrastructure      |     5 |
| Core Services       |     5 |
| Advanced Services   |     5 |
| Public API          |     4 |
| Quality Engineering |     4 |
| Release             |     2 |

Total:

```
30 Tasks
```

---

# Success Criteria

This epic is considered complete when:

- All 30 tasks are completed.
- Public API is finalized.
- Architecture review is approved.
- Release certification is approved.
- Package is ready for downstream dependencies.

---

# References

- ADR-0001 — Monorepo Structure
- ADR-0002 — Package Dependency Rules
- ADR-0003 — Type System
- ADR-0004 — Command Framework
- ADR-0005 — Event Framework
- ADR-0006 — Package Export Strategy
- ADR-0007 — Error Handling

---

# Next Document

EPIC.md
