# ADR-0003

# Adopt a Document Object Model (DOM)

> **Status:** Accepted
>
> **Date:** 2026-07-01
>
> **Deciders:** Atlas Studio Architecture Team

---

# Context

Atlas Studio is a document-centric application for editing comic, manga, and webtoon translations.

Every user interaction ultimately modifies a document.

Examples include:

- Opening a project
- Adding a page
- Detecting speech bubbles
- Editing translated text
- Moving layers
- Exporting documents

Without a unified document model, different subsystems would maintain their own data structures, increasing complexity and inconsistency.

---

# Problem

Multiple subsystems require access to the same document.

Examples include:

- OCR
- Translation
- Rendering
- Export
- History
- AI
- Plugins

If each subsystem owns its own representation of the document, synchronization becomes difficult.

Examples:

```text
OCR Model

↓

Renderer Model

↓

Translation Model

↓

Export Model
```

Every conversion introduces additional complexity.

---

# Decision

Atlas Studio adopts a single Document Object Model (DOM).

Every subsystem interacts with the same document tree.

The document model is implemented in:

```
atlas-document
```

Business logic is implemented elsewhere.

---

# Document Hierarchy

```text
AtlasDocument
│
└── WorkspaceDocument
    │
    └── ProjectDocument
        │
        └── PageDocument
            │
            └── LayerDocument
                │
                └── BubbleDocument
                    │
                    └── TranslationDocument
```

Each node owns its children.

Ownership is exclusive.

---

# Aggregate Roots

The following objects are Aggregate Roots.

```
AtlasDocument

WorkspaceDocument

ProjectDocument
```

Lower-level nodes are owned by their parent.

---

# Ownership Rules

Ownership is hierarchical.

```
Workspace

↓

Project

↓

Page

↓

Layer

↓

Bubble

↓

Translation
```

A child cannot exist without its parent.

---

# State Management

State is encapsulated.

Good

```ts
project.addPage(page);
```

Bad

```ts
project.pages.push(page);
```

Collections must never expose mutable internal state.

---

# Collections

All child collections use:

```ts
DocumentCollection<T>;
```

Examples

```ts
DocumentCollection<ProjectDocument>;

DocumentCollection<PageDocument>;

DocumentCollection<LayerDocument>;

DocumentCollection<BubbleDocument>;
```

Raw arrays should not be exposed publicly.

---

# Identity

Every document node has a stable identifier.

Examples

```
WorkspaceId

ProjectId

PageId

LayerId

BubbleId

TranslationId
```

Identifiers remain stable throughout the lifecycle of the node.

---

# Traversal

Traversal is provided by the Traversal Framework.

Document classes must not implement traversal algorithms directly.

Supported strategies include:

- Depth-First Search (DFS)
- Breadth-First Search (BFS)

---

# Serialization

Document nodes do not serialize themselves.

Serialization is delegated to serializer implementations.

Examples

```
JSON Serializer

YAML Serializer

Atlas Serializer
```

The document model remains serialization-agnostic.

---

# Snapshot

Document state may be captured as immutable snapshots.

Snapshots are used by:

- Undo / Redo
- Autosave
- Collaboration
- Version History

Snapshots never modify the live document.

---

# Mutation

All document modifications occur through public APIs.

Good

```ts
page.addLayer(layer);
```

Bad

```ts
page.layers.push(layer);
```

Mutation behavior remains consistent across the document tree.

---

# Business Logic

Business logic does not belong in document classes.

Forbidden

```ts
page.translate();

page.detectBubble();

page.render();

project.exportPDF();
```

Business logic belongs in:

```
atlas-core
```

---

# Events

Document classes do not publish events.

Events are handled by:

```
atlas-events
```

---

# Commands

Document classes do not execute commands.

Commands belong to:

```
atlas-command
```

---

# Validation

Validation rules are not embedded in document classes.

Examples

```
Bubble outside page

Invalid translation

Duplicate page
```

Validation belongs to:

```
atlas-core
```

or a dedicated validation package.

---

# Public API

Consumers interact with the document model through stable APIs.

Example

```ts
project.addPage(page);

page.addLayer(layer);

layer.addBubble(bubble);

bubble.setTranslation(translation);
```

Internal implementation details remain hidden.

---

# Package Responsibilities

The document package is responsible only for:

- Document hierarchy
- Ownership
- Identity
- Collections
- Traversal
- Snapshot
- Diff
- Mutation contracts
- Serialization contracts

It is not responsible for:

- OCR
- Rendering
- AI
- Export
- Translation engines
- Commands
- Event dispatching
- Validation

---

# Rationale

A single Document Object Model provides:

- Consistent data representation
- Reduced duplication
- Easier synchronization
- Simpler testing
- Stable APIs
- Better extensibility
- Improved AI-assisted development

---

# Consequences

## Positive

- Single source of truth.
- Shared data model.
- Easier feature integration.
- Cleaner package boundaries.
- Simpler traversal.
- Better snapshot support.

## Negative

- Initial architecture requires more planning.
- Changes to the document model affect multiple packages.
- Strong versioning discipline is required.

---

# Alternatives Considered

## Separate Models Per Subsystem

Rejected.

Reason:

Each subsystem maintaining its own document representation would require constant synchronization and conversion.

---

## JSON as Primary Model

Rejected.

Reason:

JSON is a serialization format, not a runtime object model.

---

## Entity Component System (ECS)

Rejected.

Reason:

ECS is well suited for simulations and games, but introduces unnecessary complexity for a hierarchical document editing application.

---

# Compliance

Every implementation must satisfy the following:

- [ ] Uses the official document hierarchy.
- [ ] Preserves ownership rules.
- [ ] Uses `DocumentCollection<T>` for child nodes.
- [ ] Exposes only public APIs.
- [ ] Does not contain business logic.
- [ ] Does not publish events.
- [ ] Does not execute commands.
- [ ] Remains serialization-independent.

Architectural changes require a new ADR.

---

# References

- ADR-0001 — Use Monorepo
- ADR-0002 — Package Dependency Rules
- PACKAGE_DEPENDENCY_GRAPH.md
- DESIGN_PRINCIPLES.md
- MONOREPO_STRUCTURE.md
