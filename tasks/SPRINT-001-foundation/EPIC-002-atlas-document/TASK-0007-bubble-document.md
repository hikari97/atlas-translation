---

id: TASK-0007
title: Implement BubbleDocument

status: Ready

priority: Critical

story_points: 5

sprint: SPRINT-001

epic: EPIC-002

package: atlas-document

owner: H.Makki

reviewer:

created_at: 2026-07-01

## updated_at: 2026-07-01

# TASK-0007 — Implement BubbleDocument

## Summary

Implement the `BubbleDocument`, the document model representing a single editable speech bubble, narration box, thought bubble, or sound effect within a page.

A `BubbleDocument` encapsulates bubble geometry, content, typography, OCR results, translation references, and metadata while remaining independent from rendering and AI processing.

---

# Goal

Create a reusable document model that represents a single editable text region inside a page and serves as the foundation for OCR, translation, and typography workflows.

---

# Background

A `BubbleDocument` is one of the most frequently edited objects inside Atlas Studio.

It represents a logical text region rather than a rendered visual object.

Multiple services will consume this document:

- OCR
- Translation
- Typography
- Rendering
- Export
- AI

However, those services are implemented in other packages.

---

# Scope

## Included

- BubbleDocument class
- BubbleMetadata
- BubbleGeometry
- BubbleContent
- BubbleTypographyReference
- BubbleOCRReference
- BubbleTranslationReference
- BubbleState
- Barrel exports

---

## Excluded

- Translation implementation
- OCR implementation
- Rendering
- Typography engine
- AI
- Export
- Commands
- Events
- Business logic

---

# Deliverables

```text
packages/
└── atlas-document/
    └── src/
        └── bubble/
            ├── BubbleDocument.ts
            ├── BubbleMetadata.ts
            ├── BubbleGeometry.ts
            ├── BubbleContent.ts
            ├── BubbleTypographyReference.ts
            ├── BubbleOCRReference.ts
            ├── BubbleTranslationReference.ts
            ├── BubbleState.ts
            └── index.ts
```

---

# Responsibilities

BubbleDocument is responsible for:

- Managing bubble metadata.
- Managing bubble geometry.
- Managing editable text content.
- Holding OCR references.
- Holding translation references.
- Holding typography references.
- Managing bubble state.

BubbleDocument is **not** responsible for:

- OCR execution.
- Translation.
- Rendering.
- AI processing.
- Typography layout.
- Commands.
- Events.
- Persistence.

---

# Public API

The document model should expose a lightweight editing API.

Examples include:

```ts
bubble.id;

bubble.geometry;

bubble.content;

bubble.translation;

bubble.typography;

bubble.hasTranslation();

bubble.hasOCR();

bubble.setContent(content);

bubble.setGeometry(geometry);
```

The document should encapsulate mutable state and expose a stable public API.

---

# Technical Requirements

The implementation must:

- Depend only on `@atlas/types`.
- Reuse Bubble contracts from `atlas-types`.
- Encapsulate mutable state.
- Use strict TypeScript.
- Avoid runtime dependencies.
- Follow project coding standards.

---

# Files Allowed

```text
packages/atlas-document/src/bubble/**
packages/atlas-document/src/index.ts
```

---

# Files Forbidden

```text
packages/atlas-types/**
packages/atlas-command/**
packages/atlas-events/**
packages/atlas-core/**
apps/**
plugins/**
```

---

# Dependencies

Required:

- TASK-0001
- TASK-0002
- TASK-0003
- TASK-0004
- TASK-0005
- TASK-0006

---

# Acceptance Criteria

- [ ] BubbleDocument implemented.
- [ ] BubbleMetadata implemented.
- [ ] BubbleGeometry implemented.
- [ ] BubbleContent implemented.
- [ ] BubbleTypographyReference implemented.
- [ ] BubbleOCRReference implemented.
- [ ] BubbleTranslationReference implemented.
- [ ] BubbleState implemented.
- [ ] Public API exported.
- [ ] Build succeeds.

---

# Definition of Done

The task is complete when:

- BubbleDocument represents a single editable text region.
- References to OCR, Translation, and Typography are available.
- Mutable state remains encapsulated.
- Public API is stable.
- Package is ready for TranslationDocument.

---

# AI Checklist

Before implementation:

- Implement only BubbleDocument.
- Do not implement TranslationDocument.
- Do not implement OCR.
- Do not implement rendering.
- Do not implement typography layout.
- Do not implement business logic.
- Stop after completing this task.

---

# Next Task

TASK-0008 — Implement TranslationDocument
