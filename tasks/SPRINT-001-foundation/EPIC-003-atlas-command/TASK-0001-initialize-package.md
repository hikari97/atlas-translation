---
id: TASK-0001

title: Initialize atlas-command Package

status: Ready

priority: Critical

story_points: 3

sprint: SPRINT-001

epic: EPIC-003

package: atlas-command

owner: H.Makki

reviewer:

created_at: 2026-07-01

updated_at: 2026-07-01
---

# TASK-0001 — Initialize atlas-command Package

## Summary

Initialize the `atlas-command` package.

This task establishes the package structure, build configuration, TypeScript configuration, package metadata, documentation, and export entry points.

No command framework implementation should be introduced.

---

# Goal

Create a production-ready package skeleton that follows the Atlas Studio architecture and is ready for future implementation.

---

# Background

`atlas-command` is the execution engine responsible for coordinating all document mutations within Atlas Studio.

Before implementing command execution, the package must provide a consistent project structure.

---

# Scope

## Included

- Package initialization
- TypeScript configuration
- Build configuration
- Package metadata
- Root exports
- Documentation placeholders
- Source folder structure
- Test folder structure

---

## Excluded

- Command contracts
- Command Bus
- Handlers
- Middleware
- Transactions
- Undo / Redo
- History
- Validation
- Business logic

---

# Deliverables

```text
packages/
└── atlas-command/
    ├── package.json
    ├── tsconfig.json
    ├── tsup.config.ts
    ├── README.md
    ├── ARCHITECTURE.md
    ├── API.md
    ├── CHANGELOG.md
    ├── CONTRIBUTING.md
    │
    ├── src/
    │   ├── index.ts
    │   │
    │   ├── command/
    │   ├── handler/
    │   ├── bus/
    │   ├── pipeline/
    │   ├── middleware/
    │   ├── transaction/
    │   ├── history/
    │   ├── undo/
    │   ├── redo/
    │   ├── registry/
    │   ├── context/
    │   ├── result/
    │   ├── errors/
    │   └── internal/
    │
    └── tests/
        ├── unit/
        ├── integration/
        └── fixtures/
```

---

# Package Dependencies

Allowed

```text
@atlas/types

@atlas/document
```

Forbidden

```text
@atlas/events

@atlas/core

apps/

plugins/
```

---

# Public API

Only the package root export should exist.

```ts
export {};
```

No public command types should be exported yet.

---

# Technical Requirements

The package must:

- Build successfully.
- Compile with TypeScript strict mode.
- Produce declaration files.
- Contain no circular dependencies.
- Follow the project coding standards.
- Follow all approved ADRs.

---

# Files Allowed

```text
packages/atlas-command/**
```

---

# Files Forbidden

```text
packages/atlas-types/**

packages/atlas-document/**

packages/atlas-events/**

packages/atlas-core/**

apps/**

plugins/**
```

---

# Expected Outputs

- Package initialized.
- Folder hierarchy created.
- Build configuration completed.
- Documentation placeholders created.
- Empty public API established.
- Test folders initialized.

---

# Acceptance Criteria

- [ ] Package structure created.
- [ ] Source folders created.
- [ ] Test folders created.
- [ ] Documentation files created.
- [ ] TypeScript configuration completed.
- [ ] Build configuration completed.
- [ ] Package builds successfully.
- [ ] Public API exports nothing.
- [ ] No command implementation exists.

---

# Definition of Done

This task is complete when:

- The package is ready for implementation.
- The package compiles successfully.
- No command framework code has been introduced.
- Documentation placeholders exist.
- Future tasks can build upon the established structure.

---

# AI Constraints

Before implementation:

- Do not implement Command Pattern.
- Do not create CommandBus.
- Do not create handlers.
- Do not create middleware.
- Do not create transactions.
- Do not create undo/redo.
- Do not create history.
- Do not introduce business logic.
- Stop immediately after the package skeleton is complete.

---

# Next Task

TASK-0002 — Define Command Contracts
