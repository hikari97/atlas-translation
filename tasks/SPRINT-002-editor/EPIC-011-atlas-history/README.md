# atlas-history

Atlas History provides an immutable history management system for Atlas Studio.

The package is responsible for recording, restoring, and navigating historical application states while remaining completely independent from rendering, editor behavior, persistence layers, and application frameworks.

History is designed as a generic infrastructure package that can be reused by document editing, selection management, viewport navigation, plugin systems, and future Atlas packages.

---

## Goals

- Immutable history model
- Generic snapshot management
- Undo / Redo navigation
- Transaction support
- Framework independent
- Plugin friendly

---

## Features

- History Manager
- History Entries
- Undo / Redo
- Snapshots
- Transactions
- Branching
- Serialization
- Diagnostics
- Performance Metrics

---

## Package Structure

```text
packages/

atlas-history/

src/
```

---

## Design Principles

- Immutable
- Framework Independent
- Strongly Typed
- Deterministic
- Extensible
- Lightweight

---

## Package Dependencies

This package may depend on:

- atlas-core
- atlas-events

Higher-level packages such as atlas-selection, atlas-document, atlas-renderer, and atlas-editor may depend on atlas-history.

---

## Current Epic

EPIC-011 — atlas-history

Status

Ready
