---
id: TASK-0002

title: Implement TranslationRequest

status: Completed

priority: High

story_points: 5

sprint: SPRINT-001-foundation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0002 — Implement TranslationRequest

## Summary

Implement `TranslationRequest`, the immutable data contract sent from the Translation Pipeline to a Translation Provider.

A TranslationRequest represents only the information required by a provider to perform a translation. It is not a domain model and must remain provider-independent.

---

# Capability

After this task is complete, the Translation Pipeline can invoke any Translation Provider using a single standardized request contract.

---

# Goal

Provide a stable, strongly typed request model that decouples the Translation Pipeline from provider-specific request formats.

---

# Business Value

New Translation Providers can be added without changing the Translation Pipeline.

---

# Background

The Translation Engine processes `TranslationItem`.

When a Translation Stage requires AI translation, it creates a TranslationRequest and sends it to the selected Translation Provider.

The provider should never access TranslationItem directly.

---

# Scope

## Included

- TranslationRequest contract
- Source text
- Context
- Glossary reference
- Style guide reference
- Translation options
- Metadata

## Excluded

- Translation execution
- Prompt generation
- Provider implementation
- Translation Memory
- Workflow

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationRequest.ts
        └── index.ts
```

---

# Responsibilities

TranslationRequest is responsible for:

- carrying translation input
- carrying translation options
- carrying contextual information
- remaining immutable
- remaining provider independent

TranslationRequest is NOT responsible for:

- translating text
- generating prompts
- selecting providers
- caching results

---

# Architecture

```text
TranslationItem

↓

Translation Pipeline

↓

TranslationRequest

↓

Translation Provider
```

TranslationRequest is a transport contract between the Pipeline and the Provider.

---

# Public API

```ts
interface TranslationRequest {
  readonly id: string;

  readonly text: string;

  readonly sourceLanguage?: string;

  readonly targetLanguage: string;

  readonly context?: unknown;

  readonly glossary?: unknown;

  readonly styleGuide?: unknown;

  readonly options?: TranslationOptions;
}
```

---

# Dependency

Depends On

- TASK-0001 — TranslationItem

---

# Risk

Low.

The task defines only a transport contract.

---

# Files Allowed

```text
packages/atlas-translation/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] TranslationRequest interface implemented.
- [ ] Immutable contract.
- [ ] Provider independent.
- [ ] No provider-specific fields.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

This task is complete when:

- Translation Pipeline can create TranslationRequest.
- Any Translation Provider can consume the request.
- Public API documented.

---

# AI Constraints

Before implementation:

- Do not implement Prompt Builder.
- Do not implement Translation Provider.
- Do not implement Translation Memory.
- Focus only on the TranslationRequest contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0001-translation-item.md

---

# Next Task

TASK-0003 — TranslationResult
