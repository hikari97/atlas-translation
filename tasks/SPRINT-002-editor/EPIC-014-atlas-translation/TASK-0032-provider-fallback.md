---
id: TASK-0032

title: Implement ProviderFallback

status: Ready

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

# TASK-0032 — Implement ProviderFallback

## Summary

Implement `ProviderFallback`.

ProviderFallback is responsible for selecting an alternative TranslationProvider when the preferred provider cannot satisfy a translation request.

Fallback occurs only after provider resolution and before translation execution.

---

# Capability

After this task is complete, Atlas Studio can continue translation by automatically switching to an alternative provider when necessary.

---

# Goal

Provide resilient provider selection without modifying TranslationPipeline.

---

# Business Value

Users experience fewer failed translations caused by:

- unavailable providers
- rate limits
- provider maintenance
- temporary outages
- unsupported capabilities

---

# Background

ProviderResolver selects the preferred provider.

If that provider cannot execute the request, ProviderFallback selects the next compatible provider.

Fallback never retries the same provider.

Retry is handled separately.

---

# Scope

## Included

- Fallback contract
- Alternative provider selection
- Capability validation
- Excluded provider tracking

## Excluded

- Retry
- Provider execution
- Metrics
- Scheduler
- Queue

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── ProviderFallback.ts
        └── index.ts
```

---

# Responsibilities

ProviderFallback is responsible for:

- selecting alternative providers
- avoiding previously failed providers
- validating required capabilities

ProviderFallback is NOT responsible for:

- executing providers
- retrying providers
- registering providers
- generating prompts

---

# Architecture

```text
TranslationRequest

↓

ProviderResolver

↓

Preferred Provider

↓

Unavailable

↓

ProviderFallback

↓

Alternative Provider
```

---

# Fallback Flow

```text
Resolve Preferred Provider

↓

Execution Failed

↓

Exclude Provider

↓

Find Compatible Provider

↓

Return Alternative Provider
```

---

# Public API

```ts
interface ProviderFallback {
  resolve(
    request: TranslationRequest,
    excludedProviders: readonly string[],
  ): TranslationProvider | undefined;
}
```

Returns `undefined` when no compatible provider is available.

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0004 — TranslationProvider
- TASK-0026 — ProviderRegistry
- TASK-0027 — ProviderResolver

---

# Risk

Medium

Incorrect fallback selection may repeatedly choose incompatible providers.

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

- [ ] ProviderFallback implemented.
- [ ] Supports excluded providers.
- [ ] Selects compatible provider only.
- [ ] Independent from execution.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Translation Engine can automatically continue using another compatible provider when the preferred provider is unavailable.

---

# AI Constraints

Before implementation:

- Do not execute providers.
- Do not implement retry.
- Do not collect metrics.
- Focus only on provider fallback selection.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0004-translation-provider.md
- TASK-0026-provider-registry.md
- TASK-0027-provider-resolver.md

---

# Next Task

TASK-0033-provider-metrics.md
