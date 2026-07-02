---
id: TASK-0026

title: Implement ProviderRegistry

status: Ready

priority: Critical

story_points: 8

sprint: SPRINT-004-provider-layer

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0026 — Implement ProviderRegistry

## Summary

Implement `ProviderRegistry`.

ProviderRegistry is responsible for registering, unregistering, and discovering TranslationProvider implementations.

ProviderRegistry acts as the single source of truth for all Translation Providers available during runtime.

It does not execute providers and does not decide which provider should be used.

---

# Capability

After this task is complete, Atlas Studio can dynamically register multiple Translation Providers without modifying the Translation Engine.

---

# Goal

Provide a centralized registry for TranslationProvider implementations.

---

# Business Value

New AI providers can be added as plugins with zero modifications to the Translation Engine.

Examples:

- OpenAI
- Gemini
- Claude
- Ollama
- DeepSeek
- Azure OpenAI
- OpenRouter
- Future providers

---

# Background

The Translation Engine must never hardcode provider implementations.

Instead, every provider registers itself into ProviderRegistry.

ProviderResolver will later query ProviderRegistry to determine which provider should execute a TranslationRequest.

---

# Scope

## Included

- Provider registration
- Provider removal
- Provider discovery
- Provider lookup
- Duplicate provider validation

## Excluded

- Provider selection
- Provider execution
- Translation
- Retry
- Fallback
- Configuration

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── ProviderRegistry.ts
        └── index.ts
```

---

# Responsibilities

ProviderRegistry is responsible for:

- registering TranslationProvider
- unregistering TranslationProvider
- exposing registered providers
- validating duplicate provider IDs

ProviderRegistry is NOT responsible for:

- selecting providers
- executing providers
- fallback logic
- retry logic
- provider configuration

---

# Architecture

```text
TranslationProvider

↓

ProviderRegistry

↓

ProviderResolver
```

ProviderRegistry stores providers.

ProviderResolver selects providers.

---

# Public API

```ts
interface ProviderRegistry {
  register(provider: TranslationProvider): void;

  unregister(providerId: string): void;

  get(providerId: string): TranslationProvider | undefined;

  getAll(): readonly TranslationProvider[];

  has(providerId: string): boolean;
}
```

---

# Dependency

Depends On

- TASK-0004 — TranslationProvider

---

# Risk

Medium

Incorrect provider registration may result in duplicate providers or unavailable provider discovery.

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

- [ ] ProviderRegistry implemented.
- [ ] Register provider.
- [ ] Unregister provider.
- [ ] Lookup by provider ID.
- [ ] Enumerate registered providers.
- [ ] Reject duplicate provider IDs.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

ProviderRegistry becomes the central registry for all TranslationProvider implementations.

Translation Engine no longer depends on concrete provider classes.

---

# AI Constraints

Before implementation:

- Do not implement ProviderResolver.
- Do not implement Provider execution.
- Do not implement Retry.
- Do not implement Fallback.
- Focus only on provider registration and discovery.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0004-translation-provider.md

---

# Next Task

TASK-0027-provider-resolver.md
