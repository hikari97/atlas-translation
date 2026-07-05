---
id: TASK-0031

title: Implement ContextResolver

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

# TASK-0031 — Implement ContextResolver

## Summary

Implement `ContextResolver`.

ContextResolver gathers all contextual information required before prompt generation.

It consolidates translation context from multiple sources into a single TranslationContext.

PromptBuilder consumes TranslationContext instead of directly querying different services.

---

# Capability

After this task is complete, Atlas Studio can generate context-aware prompts using a unified context model.

---

# Goal

Separate context gathering from prompt generation.

---

# Business Value

Translation quality improves because PromptBuilder receives complete contextual information without being coupled to multiple data sources.

---

# Background

Translation quality depends heavily on context.

Examples:

- previous dialogue
- neighboring text
- glossary
- character names
- project settings
- translation notes
- writing style

Instead of PromptBuilder collecting all of these itself, ContextResolver prepares them first.

---

# Scope

## Included

- Context resolution
- Context aggregation
- TranslationContext creation

## Excluded

- Prompt generation
- Translation execution
- Translation Memory
- Cache implementation
- Provider execution

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── ContextResolver.ts
        ├── TranslationContext.ts
        └── index.ts
```

---

# Responsibilities

ContextResolver is responsible for:

- collecting translation context
- combining multiple context sources
- producing TranslationContext

ContextResolver is NOT responsible for:

- generating prompts
- calling AI providers
- executing translation
- scheduling

---

# Architecture

```text
TranslationRequest

↓

ContextResolver

↓

TranslationContext

↓

PromptBuilder

↓

Prompt
```

---

# Context Sources

TranslationContext may include:

- source text
- previous translation
- glossary entries
- style guide
- project settings
- translator notes
- surrounding dialogue

ContextResolver decides how these are combined.

---

# Public API

```ts
interface ContextResolver {
  resolve(request: TranslationRequest): TranslationContext;
}
```

```ts
interface TranslationContext {
  readonly entries: readonly ContextEntry[];
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0029 — PromptBuilder

---

# Risk

Medium

Poor context resolution may reduce translation quality.

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

- [ ] ContextResolver implemented.
- [ ] TranslationContext implemented.
- [ ] Context aggregation supported.
- [ ] Immutable TranslationContext.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

PromptBuilder receives TranslationContext instead of querying multiple context sources directly.

---

# AI Constraints

Before implementation:

- Do not generate prompts.
- Do not call TranslationProvider.
- Do not implement Translation Memory.
- Focus only on context resolution.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md
- TASK-0029-prompt-builder.md

---

# Next Task

TASK-0032-provider-fallback.md
