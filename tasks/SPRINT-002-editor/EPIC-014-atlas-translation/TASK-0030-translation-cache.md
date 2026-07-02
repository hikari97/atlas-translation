---
id: TASK-0030

title: Implement TranslationCache

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

# TASK-0030 — Implement TranslationCache

## Summary

Implement `TranslationCache`.

TranslationCache stores previously translated requests and their corresponding results.

Before invoking a TranslationProvider, the Translation Engine checks the cache.

If a matching translation exists, the cached result is returned immediately.

---

# Capability

After this task is complete, Atlas Studio can reuse previous translations, reducing latency and AI API costs.

---

# Goal

Provide a provider-independent translation cache.

---

# Business Value

TranslationCache enables:

- lower API costs
- faster repeated translations
- reduced provider usage
- consistent translation results

---

# Background

Repeated translation requests are common.

Examples:

- identical dialogue
- repeated UI text
- chapter retranslation
- project recovery

Instead of calling AI again:

```text
TranslationRequest

↓

TranslationCache

↓

Cache Hit

↓

TranslationResult
```

Otherwise:

```text
TranslationRequest

↓

TranslationProvider

↓

TranslationResult

↓

TranslationCache
```

---

# Scope

## Included

- Cache contract
- Cache lookup
- Cache storage
- Cache invalidation
- Cache key generation

## Excluded

- Translation Memory
- Persistent storage
- Retry
- Provider execution

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationCache.ts
        ├── TranslationCacheEntry.ts
        └── index.ts
```

---

# Responsibilities

TranslationCache is responsible for:

- storing TranslationResult
- retrieving cached results
- checking cache existence
- removing cached entries

TranslationCache is NOT responsible for:

- provider selection
- translation execution
- translation memory
- prompt generation

---

# Architecture

```text
TranslationRequest

↓

TranslationCache

├── Cache Hit
│      ↓
│ TranslationResult
│
└── Cache Miss
       ↓
TranslationProvider
       ↓
TranslationResult
       ↓
TranslationCache
```

---

# Cache Key

The cache key should be deterministic.

Possible inputs include:

- source text
- source language
- target language
- translation options
- prompt version

Different requests must never share the same cache key.

---

# Public API

```ts
interface TranslationCache {
  has(key: string): boolean;

  get(key: string): TranslationResult | undefined;

  put(key: string, result: TranslationResult): void;

  remove(key: string): void;

  clear(): void;
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0003 — TranslationResult
- TASK-0028 — TranslationMiddleware

---

# Risk

Medium

Incorrect cache keys may produce invalid translation results.

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

- [ ] TranslationCache contract implemented.
- [ ] Cache lookup supported.
- [ ] Cache insertion supported.
- [ ] Cache removal supported.
- [ ] Cache clearing supported.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Translation Engine can reuse previously translated results without calling TranslationProvider.

---

# AI Constraints

Before implementation:

- Do not implement persistent storage.
- Do not implement Translation Memory.
- Do not implement Retry.
- Focus only on the cache contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md
- TASK-0003-translation-result.md
- TASK-0028-translation-middleware.md

---

# Next Task

TASK-0031-context-resolver.md
