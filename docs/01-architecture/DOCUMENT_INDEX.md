# Atlas Studio — Documentation Index

> Last Updated: 2026-07-01

---

# Overview

This document serves as the master index for all Atlas Studio documentation.

It provides a recommended reading order and quick access to every major document in the project.

---

# Recommended Reading Order

New contributors should read documents in the following order:

1. START_HERE.md
2. DESIGN_PRINCIPLES.md
3. CODING_STANDARDS.md
4. PACKAGE_DEPENDENCY_GRAPH.md
5. PACKAGE_ROADMAP.md
6. ADRs
7. Package Documentation
8. EPIC Documentation

---

# Project Overview

| Document                    | Purpose                          |
| --------------------------- | -------------------------------- |
| START_HERE.md               | Entry point for new contributors |
| DOCUMENT_INDEX.md           | Documentation index              |
| PACKAGE_ROADMAP.md          | Package implementation roadmap   |
| PACKAGE_DEPENDENCY_GRAPH.md | Package dependency graph         |
| EPIC_STATUS.md              | Current project progress         |
| RELEASE_PLAN.md             | Planned release roadmap          |

---

# Architecture

| Document                           | Description                 |
| ---------------------------------- | --------------------------- |
| DESIGN_PRINCIPLES.md               | Core engineering principles |
| CODING_STANDARDS.md                | Coding conventions          |
| NAMING_CONVENTIONS.md _(optional)_ | Naming standards            |
| TESTING_GUIDELINES.md _(optional)_ | Testing strategy            |

---

# Architecture Decision Records (ADR)

| ADR      | Title                         |
| -------- | ----------------------------- |
| ADR-0001 | Monorepo Architecture         |
| ADR-0002 | Package Dependency Rules      |
| ADR-0003 | Type System Strategy          |
| ADR-0004 | Command Pattern               |
| ADR-0005 | Event Driven Architecture     |
| ADR-0006 | Dependency Injection Strategy |
| ADR-0007 | Service Provider Architecture |

---

# Package Documentation

## Foundation

| Package        | Status      |
| -------------- | ----------- |
| atlas-types    | ✅ Complete |
| atlas-document | ✅ Complete |
| atlas-command  | ✅ Complete |

---

## Runtime

| Package      | Status     |
| ------------ | ---------- |
| atlas-events | ⬜ Planned |
| atlas-core   | ⬜ Planned |

---

## Rendering

| Package        | Status     |
| -------------- | ---------- |
| atlas-renderer | ⬜ Planned |
| atlas-storage  | ⬜ Planned |

---

## Collaboration

| Package             | Status     |
| ------------------- | ---------- |
| atlas-collaboration | ⬜ Planned |
| atlas-import        | ⬜ Planned |
| atlas-export        | ⬜ Planned |

---

## Extensions

| Package        | Status     |
| -------------- | ---------- |
| atlas-plugin   | ⬜ Planned |
| atlas-devtools | ⬜ Planned |
| atlas-cli      | ⬜ Planned |

---

## Application

| Package   | Status     |
| --------- | ---------- |
| atlas-ui  | ⬜ Planned |
| atlas-app | ⬜ Planned |

---

# Epic Documents

| Epic     | Package        | Status |
| -------- | -------------- | ------ |
| EPIC-001 | atlas-types    | ✅     |
| EPIC-002 | atlas-document | ✅     |
| EPIC-003 | atlas-command  | ✅     |
| EPIC-004 | atlas-events   | ⬜     |
| EPIC-005 | atlas-core     | ⬜     |

---

# Sprint Documents

| Sprint     | Status      |
| ---------- | ----------- |
| SPRINT-001 | ✅ Complete |
| SPRINT-002 | ⬜ Planned  |
| SPRINT-003 | ⬜ Planned  |

---

# Development Workflow

```text
START_HERE

↓

Architecture

↓

ADR

↓

Package Roadmap

↓

Epic

↓

Sprint

↓

Task

↓

Implementation

↓

Testing

↓

Release
```

---

# Documentation Categories

```text
architecture/
│
├── Overview
│   ├── START_HERE.md
│   ├── DOCUMENT_INDEX.md
│   ├── PACKAGE_ROADMAP.md
│   ├── PACKAGE_DEPENDENCY_GRAPH.md
│   ├── EPIC_STATUS.md
│   └── RELEASE_PLAN.md
│
├── Standards
│   ├── DESIGN_PRINCIPLES.md
│   ├── CODING_STANDARDS.md
│   └── TESTING_GUIDELINES.md
│
├── ADR
│   ├── ADR-0001.md
│   ├── ADR-0002.md
│   ├── ...
│   └── ADR-0007.md
│
├── Epics
│   ├── EPIC-001
│   ├── EPIC-002
│   ├── EPIC-003
│   └── ...
│
└── Packages
    ├── atlas-types
    ├── atlas-document
    ├── atlas-command
    └── ...
```

---

# Documentation Rules

All documentation should follow these principles:

- Keep documents focused on a single topic.
- Prefer architecture over implementation details.
- Update documentation together with code changes.
- Cross-reference related documents where appropriate.
- Preserve backward compatibility for public APIs.

---

# Current Project Status

| Category            | Status         |
| ------------------- | -------------- |
| Architecture        | ✅ Complete    |
| Foundation Packages | ✅ Complete    |
| Runtime Packages    | 🚧 In Planning |
| Rendering           | ⬜ Planned     |
| Collaboration       | ⬜ Planned     |
| Extensions          | ⬜ Planned     |
| Application         | ⬜ Planned     |

---

# Next Milestone

Current Target:

**EPIC-004 — atlas-events**
