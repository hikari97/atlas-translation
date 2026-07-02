---
id: EPIC-003

title: Build atlas-command

status: Ready

priority: Critical

story_points: 89

sprint: SPRINT-001

package: atlas-command

owner: H.Makki

reviewer:

created_at: 2026-07-01

updated_at: 2026-07-01
---

# EPIC-003 — Build atlas-command

## Summary

Implement the complete command execution framework for Atlas Studio.

The `atlas-command` package is responsible for coordinating every modification made to the Atlas Document Object Model.

All write operations must execute through the Command Framework.

This package provides the execution engine that enables:

- Command Pattern
- Transactions
- Undo / Redo
- History
- Middleware
- Validation
- Composite Commands
- Macro Commands

The package does not contain business logic.

---

# Goal

Build a reusable, extensible, and strongly typed command framework that coordinates document mutations while preserving architectural boundaries.

---

# Background

Atlas Studio follows the architecture defined by:

- ADR-0003 — Document Object Model
- ADR-0004 — Command Pattern
- ADR-0005 — Event-Driven Architecture
- ADR-0007 — Service Provider Architecture

The command framework becomes the single entry point for modifying document state.

No subsystem may mutate documents directly.

---

# Responsibilities

atlas-command is responsible for:

- Command contracts
- Command execution
- Command Bus
- Command Handlers
- Middleware pipeline
- Validation pipeline
- Transactions
- History
- Undo
- Redo
- Macro Commands
- Composite Commands

---

# Out of Scope

This package must not implement:

- Document models
- Rendering
- OCR
- Translation
- AI
- Event dispatching
- UI
- Business workflows

---

# Dependencies

Required:

- atlas-types
- atlas-document

Forbidden:

- atlas-events
- atlas-core
- apps
- plugins

---

# Deliverables

The package should provide:

- Stable public API
- Type-safe command execution
- Extensible middleware
- Transaction support
- Undo / Redo framework
- History management
- Complete documentation
- Test coverage

---

# Public API

The package is expected to expose:

```ts
Command;

CommandBus;

CommandHandler;

CommandContext;

CommandResult;

CommandPipeline;

Transaction;

UndoManager;

RedoManager;

HistoryManager;
```

---

# Architecture

```text
Application
        │
        ▼
Command
        │
        ▼
Command Bus
        │
        ▼
Middleware
        │
        ▼
Validation
        │
        ▼
Handler
        │
        ▼
Mutation
        │
        ▼
Document
        │
        ▼
Events
```

---

# Task Breakdown

| Task      | Title                    |
| --------- | ------------------------ |
| TASK-0001 | Initialize Package       |
| TASK-0002 | Define Command Contracts |
| TASK-0003 | Define Command Context   |
| TASK-0004 | Define Command Result    |
| TASK-0005 | Define Command Handler   |
| TASK-0006 | Define Command Bus       |
| TASK-0007 | Command Registry         |
| TASK-0008 | Handler Registry         |
| TASK-0009 | Command Resolver         |
| TASK-0010 | Command Dispatcher       |
| TASK-0011 | Command Pipeline         |
| TASK-0012 | Middleware Contracts     |
| TASK-0013 | Middleware Pipeline      |
| TASK-0014 | Validation Framework     |
| TASK-0015 | Transaction Contracts    |
| TASK-0016 | Transaction Manager      |
| TASK-0017 | History Framework        |
| TASK-0018 | Undo Framework           |
| TASK-0019 | Redo Framework           |
| TASK-0020 | Composite Commands       |
| TASK-0021 | Macro Commands           |
| TASK-0022 | Command Metadata         |
| TASK-0023 | Error Handling           |
| TASK-0024 | Build Public API         |
| TASK-0025 | Documentation            |
| TASK-0026 | Unit Testing             |
| TASK-0027 | Integration Testing      |
| TASK-0028 | Performance Review       |
| TASK-0029 | Engineering Review       |
| TASK-0030 | Release Readiness        |

---

# Success Criteria

The epic is complete when:

- Every document mutation executes through the Command Framework.
- Public APIs are stable.
- Architecture complies with all approved ADRs.
- Tests pass successfully.
- Package is approved for downstream integration.

---

# References

- ADR-0003 — Adopt a Document Object Model
- ADR-0004 — Adopt the Command Pattern
- ADR-0005 — Adopt Event-Driven Architecture
- ADR-0007 — Adopt a Service Provider Architecture
- DESIGN_PRINCIPLES.md
- PACKAGE_DEPENDENCY_GRAPH.md
