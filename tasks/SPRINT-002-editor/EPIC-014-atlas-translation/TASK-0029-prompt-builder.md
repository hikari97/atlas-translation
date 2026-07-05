---
id: TASK-0029

title: Implement PromptBuilder

status: Completed

priority: High

story_points: 8

sprint: SPRINT-004-provider-layer

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0029 — Implement PromptBuilder

## Summary

Implement `PromptBuilder`.

PromptBuilder is responsible for constructing AI prompts from TranslationRequest and translation context.

PromptBuilder produces provider-independent prompt objects.

Provider-specific formatting remains the responsibility of each TranslationProvider.

---

# Capability

After this task is complete, Atlas Studio can generate consistent prompts for different AI providers without duplicating prompt logic.

---

# Goal

Separate prompt generation from TranslationProvider implementations.

---

# Business Value

Prompt templates become reusable across providers.

Improving prompt quality automatically benefits every supported provider.

---

# Background

Without PromptBuilder every provider would duplicate prompt generation.

Instead the flow becomes:

TranslationRequest

↓

PromptBuilder

↓

Prompt

↓

TranslationProvider

---

# Scope

## Included

- Prompt generation
- Prompt composition
- Context integration
- System instructions
- User instructions

## Excluded

- Provider formatting
- Translation execution
- Translation Memory
- Cache
- Retry

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── PromptBuilder.ts
        ├── Prompt.ts
        └── index.ts
```

---

# Responsibilities

PromptBuilder is responsible for:

- generating prompts
- composing instructions
- preserving translation context
- remaining provider independent

PromptBuilder is NOT responsible for:

- calling AI providers
- formatting OpenAI messages
- formatting Gemini contents
- formatting Claude messages
- translating text

---

# Architecture

```text
TranslationRequest

↓

PromptBuilder

↓

Prompt

↓

TranslationProvider
```

---

# Prompt Composition

A prompt may contain:

- system instructions
- user request
- glossary
- style guide
- translation notes
- previous context

PromptBuilder composes these into a unified Prompt object.

---

# Public API

```ts
interface PromptBuilder {
  build(request: TranslationRequest): Prompt;
}
```

```ts
interface Prompt {
  readonly system: string;

  readonly user: string;

  readonly context: readonly string[];
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0028 — TranslationMiddleware

---

# Risk

Medium

Poor prompt generation directly impacts translation quality.

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

- [ ] PromptBuilder implemented.
- [ ] Prompt is provider independent.
- [ ] Prompt object is immutable.
- [ ] Supports contextual information.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Every TranslationProvider receives prompts from PromptBuilder instead of constructing prompts internally.

---

# AI Constraints

Before implementation:

- Do not call TranslationProvider.
- Do not implement provider formatting.
- Do not implement Translation Memory.
- Do not implement Retry.
- Focus only on prompt construction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md
- TASK-0028-translation-middleware.md

---

# Next Task

TASK-0030-translation-cache.md
