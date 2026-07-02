# Atlas Studio — Release Plan

> Last Updated: 2026-07-01

---

# Release Strategy

Atlas Studio follows an incremental package-first release strategy.

Core packages are released before feature packages.

Applications are released only after all foundational packages are stable.

---

# Release Roadmap

## Version 0.1.0 — Foundation

Status

```
██████████████████████████████ 100%
```

Packages

- ✅ atlas-types
- ✅ atlas-document
- ✅ atlas-command

Deliverables

- Shared Types
- Document Object Model
- Command Framework

---

## Version 0.2.0 — Runtime

Status

```
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
```

Packages

- atlas-events
- atlas-core

Deliverables

- Event Bus
- Event System
- Service Container
- Dependency Injection

---

## Version 0.3.0 — Rendering

Packages

- atlas-renderer
- atlas-storage

Deliverables

- Renderer
- Rendering Pipeline
- Asset Storage
- Resource Management

---

## Version 0.4.0 — Collaboration

Packages

- atlas-collaboration
- atlas-import
- atlas-export

Deliverables

- Collaboration Engine
- Import Framework
- Export Framework

---

## Version 0.5.0 — Extensions

Packages

- atlas-plugin
- atlas-devtools
- atlas-cli

Deliverables

- Plugin SDK
- Developer Tools
- Command Line Interface

---

## Version 1.0.0 — Atlas Studio

Packages

- atlas-ui
- atlas-app

Deliverables

- Complete UI Framework
- Desktop/Web Application
- Stable Public APIs
- Production Release

---

# Release Dependencies

```text
v0.1.0

atlas-types
      │
      ▼
atlas-document
      │
      ▼
atlas-command

────────────────────────────

v0.2.0

atlas-events
      │
      ▼
atlas-core

────────────────────────────

v0.3.0

atlas-renderer
atlas-storage

────────────────────────────

v0.4.0

atlas-collaboration
atlas-import
atlas-export

────────────────────────────

v0.5.0

atlas-plugin
atlas-devtools
atlas-cli

────────────────────────────

v1.0.0

atlas-ui
atlas-app
```

---

# Release Criteria

Each package must satisfy:

- ✅ All EPIC tasks completed
- ✅ Documentation complete
- ✅ Unit tests passing
- ✅ Integration tests passing
- ✅ Engineering Review approved
- ✅ Package Hardening completed
- ✅ Release Readiness approved

---

# Semantic Versioning

Atlas Studio follows Semantic Versioning.

```
MAJOR.MINOR.PATCH
```

Examples

| Version | Meaning                |
| ------- | ---------------------- |
| 0.1.0   | Initial Foundation     |
| 0.2.0   | Runtime Packages       |
| 0.3.0   | Rendering Packages     |
| 0.4.0   | Collaboration Packages |
| 0.5.0   | Extension Packages     |
| 1.0.0   | First Stable Release   |

---

# Release Workflow

```text
Planning

↓

Architecture

↓

Implementation

↓

Documentation

↓

Unit Testing

↓

Integration Testing

↓

Engineering Review

↓

Package Hardening

↓

Release Readiness

↓

Publish

↓

Next Version
```

---

# Current Target

Current Release

```
v0.2.0
```

Current Focus

- EPIC-004 — atlas-events

Next Releases

1. v0.2.0
2. v0.3.0
3. v0.4.0
4. v0.5.0
5. v1.0.0

---

# Long-Term Vision

Atlas Studio v1.0.0 is considered complete when:

- All core packages are production-ready.
- Public APIs are stable.
- Plugin ecosystem is available.
- Renderer is complete.
- Collaboration is functional.
- Import/Export framework is complete.
- UI framework is stable.
- Desktop/Web application is production-ready.
