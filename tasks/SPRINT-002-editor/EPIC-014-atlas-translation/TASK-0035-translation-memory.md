---
id: TASK-0035

title: Implement TranslationMemory

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-005-translation-intelligence

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0035 — Implement TranslationMemory

## Summary

Implement `TranslationMemory`.

TranslationMemory stores approved translations and reuses them when identical or highly similar TranslationRequests are encountered.

TranslationMemory improves consistency, translation quality, and reduces AI usage.

TranslationMemory is different from TranslationCache.

---

# Capability

After this task is complete, Atlas Studio can automatically reuse previous translations instead of repeatedly calling AI providers.

---

# Goal

Provide a reusable translation knowledge base.

---

# Business Value

TranslationMemory provides:

- consistent terminology
- reduced AI cost
- faster translation
- improved translation quality
- project-wide consistency

---

# Background

TranslationCache stores temporary runtime results.

TranslationMemory stores reusable translation knowledge.

Example

Source

```text
I'm home.
```

↓

Translation Memory

↓

```text
Aku pulang.
```

↓

Future requests automatically reuse the translation.

---

# Scope

## Included

- Translation memory contract
- Translation lookup
- Translation insertion
- Exact match
- Metadata

## Excluded

- Fuzzy matching
- AI translation
- Cache
- Provider execution

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationMemory.ts
        ├── TranslationMemoryEntry.ts
        └── index.ts
```

---

# Responsibilities

TranslationMemory is responsible for:

- storing approved translations
- finding existing translations
- exposing reusable translation entries

TranslationMemory is NOT responsible for:

- calling AI
- provider selection
- cache
- prompt generation

---

# Architecture

```text
TranslationRequest

↓

TranslationMemory

├── Hit
│
▼

TranslationResult

or

Miss

↓

TranslationProvider
```

---

# Public API

```ts
interface TranslationMemory {
  find(request: TranslationRequest): TranslationMemoryEntry | undefined;

  save(entry: TranslationMemoryEntry): void;
}
```

---

# Dependency

Depends On

- TASK-0002
- TASK-0003
- TASK-0028

---

# Risk

Medium

Poor matching strategy may decrease translation quality.

---

# Acceptance Criteria

- [ ] TranslationMemory contract implemented.
- [ ] Exact lookup supported.
- [ ] Save supported.
- [ ] Immutable entries.
- [ ] Strict mode passes.

---

# Definition of Done

Atlas Studio can reuse previous approved translations before invoking AI.

---

# AI Constraints

Before implementation:

- Do not implement fuzzy matching.
- Do not call AI providers.
- Focus only on TranslationMemory contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0036-glossary.md
