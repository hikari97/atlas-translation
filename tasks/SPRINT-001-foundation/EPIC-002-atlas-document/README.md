# atlas-document

Atlas Document is the immutable document model used throughout Atlas Studio.

This package defines the canonical representation of editor documents, pages, layers, bubbles, translations, metadata, versioning, serialization, and document lifecycle.

The package is designed to remain completely independent from rendering engines, editor UI, persistence layers, and application frameworks.

---

## Goals

- Immutable document model
- Strong typing
- Framework independent
- Extensible architecture
- Plugin friendly
- Deterministic behavior

---

## Features

- Workspace Document
- Project Document
- Page Document
- Layer Document
- Bubble Document
- Translation Document
- Metadata
- Versioning
- Serialization
- Validation

---

## Package Structure

```text
packages/

atlas-document/

src/
```

---

## Design Principles

- Immutable
- Framework Independent
- Serializable
- Type Safe
- Extensible
- Predictable

---

## Package Dependencies

This package should have no dependency on:

- atlas-renderer
- atlas-ui
- atlas-editor
- browser APIs

Higher-level packages may depend on atlas-document.

---

## Development Status

Current Epic

EPIC-002 — atlas-document

Status

In Progress
