---

id: TASK-0008
title: Implement TranslationDocument

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

# TASK-0008 — Implement TranslationDocument

## Summary

Implement the `TranslationDocument`, the document model representing a translation associated with a single `BubbleDocument`.

The TranslationDocument manages translated content, language information, review status, provider metadata, and revision history while remaining independent from translation engines and rendering.

---

# Goal

Create a reusable translation model that represents the editable translation state of a bubble.

The document should support manual editing, AI-generated translations, and future collaborative review workflows.

---

# Background

Every Bubble may have zero or one active TranslationDocument.

A TranslationDocument represents the editable translation state throughout the document lifecycle.

It is consumed by:

- Translation services
- Review workflows
- Rendering
- Export

However, none of those services are implemented inside this package.

---

# Scope

## Included

- TranslationDocument class
- TranslationMetadata
- TranslationContent
- TranslationLanguage
- TranslationProvider
- TranslationReview
- TranslationRevision
- TranslationState
- Barrel exports

---

## Excluded

- AI translation
- OCR
- Rendering
- Typography
- Prompt generation
- Translation memory
- Commands
- Events
- Business logic

---

# Deliverables

```text
packages/
└── atlas-document/
    └── src/
        └── translation/
            ├── TranslationDocument.ts
            ├── TranslationMetadata.ts
            ├── TranslationContent.ts
            ├── TranslationLanguage.ts
            ├── TranslationProvider.ts
            ├── TranslationReview.ts
            ├── TranslationRevision.ts
            ├── TranslationState.ts
            └── index.ts
```

---

# Responsibilities

TranslationDocument is responsible for:

- Managing original text.
- Managing translated text.
- Managing language metadata.
- Managing provider metadata.
- Managing review information.
- Managing revision history.
- Managing translation lifecycle state.

TranslationDocument is **not** responsible for:

- AI translation.
- OCR.
- Rendering.
- Typography.
- Prompt generation.
- Export.
- Commands.
- Events.

---

# Public API

The document model should expose a simple editing API.

Examples include:

```ts
translation.originalText;

translation.translatedText;

translation.sourceLanguage;

translation.targetLanguage;

translation.provider;

translation.review;

translation.state;

translation.setTranslatedText(text);

translation.markReviewed();

translation.resetReview();
```

The implementation must encapsulate mutable state while exposing a stable public API.

---

# Technical Requirements

The implementation must:

- Depend only on `@atlas/types`.
- Reuse Translation contracts defined in `atlas-types`.
- Encapsulate mutable state.
- Use strict TypeScript.
- Avoid unnecessary runtime dependencies.
- Follow project coding standards.

---

# Files Allowed

```text
packages/atlas-document/src/translation/**
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
- TASK-0007

---

# Acceptance Criteria

- [ ] TranslationDocument implemented.
- [ ] TranslationMetadata implemented.
- [ ] TranslationContent implemented.
- [ ] TranslationLanguage implemented.
- [ ] TranslationProvider implemented.
- [ ] TranslationReview implemented.
- [ ] TranslationRevision implemented.
- [ ] TranslationState implemented.
- [ ] Public API exported.
- [ ] Build succeeds.

---

# Definition of Done

The task is complete when:

- BubbleDocument can reference a TranslationDocument.
- TranslationDocument encapsulates editable translation data.
- Translation state is independent from rendering and AI services.
- Public API is stable.
- Package is ready for Collection support.

---

# AI Checklist

Before implementation:

- Implement only TranslationDocument.
- Do not implement AI translation.
- Do not implement OCR.
- Do not implement rendering.
- Do not implement typography.
- Do not implement business logic.
- Stop after completing this task.

---

# Next Task

TASK-0009 — Implement Document Collections
