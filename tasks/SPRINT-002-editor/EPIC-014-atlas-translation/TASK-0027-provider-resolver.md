---
id: TASK-0027

title: Implement ProviderResolver

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-004-provider-layer

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0027 — Implement ProviderResolver

## Summary

Implement `ProviderResolver`.

ProviderResolver is responsible for selecting the most appropriate TranslationProvider for a TranslationRequest.

ProviderResolver never executes providers.

Execution remains the responsibility of TranslationPipeline and TranslationProvider.

---

# Capability

After this task is complete, Atlas Studio can automatically select the most appropriate TranslationProvider based on runtime requirements and provider capabilities.

---

# Goal

Provide a flexible provider selection mechanism independent from TranslationPipeline.

---

# Business Value

Users can switch providers or configure automatic provider selection without modifying Translation Pipelines.

Examples:

- OpenAI
- Gemini
- Claude
- Ollama
- DeepSeek

The Translation Engine remains provider agnostic.

---

# Background

ProviderRegistry knows **what providers exist**.

ProviderResolver decides **which provider should be used**.

The resolver may consider:

- requested capabilities
- provider availability
- provider priority
- runtime configuration

The resolver must not execute providers.

---

# Scope

## Included

- Provider resolution
- Capability matching
- Runtime provider selection
- Resolver contract

## Excluded

- Provider execution
- Retry
- Fallback
- Metrics
- Configuration UI

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── ProviderResolver.ts
        └── index.ts
```

---

# Responsibilities

ProviderResolver is responsible for:

- selecting TranslationProvider
- validating provider capabilities
- resolving provider from registry
- returning the selected provider

ProviderResolver is NOT responsible for:

- executing TranslationProvider
- retry logic
- fallback logic
- prompt generation
- translation cache

---

# Architecture

```text
TranslationRequest

↓

ProviderResolver

↓

ProviderRegistry

↓

TranslationProvider
```

---

# Resolution Flow

```text
TranslationRequest

↓

Read Required Capabilities

↓

Query ProviderRegistry

↓

Filter Providers

↓

Select Best Provider

↓

Return Provider
```

---

# Public API

```ts
interface ProviderResolver {
  resolve(request: TranslationRequest): TranslationProvider;
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0004 — TranslationProvider
- TASK-0026 — ProviderRegistry

---

# Risk

High

Incorrect provider resolution may lead to incompatible providers being selected.

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

- [ ] ProviderResolver implemented.
- [ ] Resolves provider from ProviderRegistry.
- [ ] Supports capability-based selection.
- [ ] Independent from provider implementation.
- [ ] Does not execute providers.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

ProviderResolver can resolve the most appropriate TranslationProvider without depending on concrete provider implementations.

---

# AI Constraints

Before implementation:

- Do not execute providers.
- Do not implement fallback.
- Do not implement retry.
- Do not implement prompt generation.
- Focus only on provider resolution.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md
- TASK-0004-translation-provider.md
- TASK-0026-provider-registry.md

---

# Next Task

TASK-0028-translation-middleware.md
