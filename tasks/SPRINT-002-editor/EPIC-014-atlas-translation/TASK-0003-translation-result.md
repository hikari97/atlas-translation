---
id: TASK-0003

title: Implement TranslationResult

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

# TASK-0003 — Implement TranslationResult

## Summary

Implement `TranslationResult`, the immutable response contract returned by a Translation Provider after successfully translating a TranslationRequest.

TranslationResult represents the provider output only.

It does not represent the final TranslationItem.

---

# Capability

After this task is complete, every Translation Provider can return translation results using a single standardized response contract.

---

# Goal

Provide a provider-independent result model that can be consumed by the Translation Pipeline.

---

# Business Value

The Translation Engine can switch providers without changing downstream processing.

---

# Background

Translation Providers may return very different response formats.

TranslationResult normalizes those responses into a stable public contract.

---

# Scope

## Included

- translated text
- detected language
- metadata
- provider information
- usage information
- confidence reference

## Excluded

- TranslationItem
- Translation Memory
- Pipeline execution
- Retry
- Validation

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationResult.ts
        └── index.ts
```

---

# Responsibilities

TranslationResult is responsible for:

- representing translated output
- remaining immutable
- remaining provider independent
- exposing provider metadata

TranslationResult is NOT responsible for:

- validation
- caching
- retry
- workflow
- rendering

---

# Architecture

```text
TranslationRequest

↓

TranslationProvider

↓

TranslationResult

↓

Translation Pipeline
```

---

# Public API

```ts
interface TranslationResult {
  readonly id: string;

  readonly text: string;

  readonly detectedLanguage?: string;

  readonly provider?: string;

  readonly metadata?: unknown;
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest

---

# Risk

Low.

Defines only the provider response contract.

---

# Files Allowed

```text
packages/atlas-translation/src/**
```

---

# Acceptance Criteria

- [ ] TranslationResult interface implemented.
- [ ] Immutable.
- [ ] Provider independent.
- [ ] Public export available.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Translation Providers return TranslationResult through a stable public API.

---

# AI Constraints

Before implementation:

- Do not implement validation.
- Do not implement Translation Memory.
- Do not implement provider selection.
- Focus only on the TranslationResult contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md

---

# Next Task

TASK-0004 — TranslationProvider
