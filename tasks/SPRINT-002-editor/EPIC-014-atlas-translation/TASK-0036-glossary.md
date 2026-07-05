---
id: TASK-0036

title: Implement Glossary

status: Completed

priority: Critical

story_points: 8

sprint: SPRINT-005-translation-intelligence

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0036 — Implement Glossary

## Summary

Implement `Glossary`.

Glossary stores translation terminology that must always be translated consistently.

Unlike TranslationMemory, Glossary applies to words, phrases, names, and domain-specific terminology rather than complete translations.

---

# Capability

After this task is complete, Atlas Studio can enforce consistent terminology across every translation.

---

# Goal

Provide a reusable terminology database.

---

# Business Value

Glossary improves:

- translation consistency
- character name consistency
- place name consistency
- technical terminology
- brand terminology

---

# Background

Examples

```text
Mana Core

↓

Inti Mana
```

```text
Spirit Stone

↓

Batu Roh
```

```text
Hunter Association

↓

Asosiasi Hunter
```

Every future translation must reuse these terms.

---

# Scope

## Included

- Glossary contract
- Glossary lookup
- Glossary entries
- Exact terminology matching

## Excluded

- Translation Memory
- Fuzzy matching
- AI translation
- Cache

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── Glossary.ts
        ├── GlossaryEntry.ts
        └── index.ts
```

---

# Responsibilities

Glossary is responsible for:

- storing terminology
- finding terminology
- enforcing terminology consistency

Glossary is NOT responsible for:

- sentence translation
- AI execution
- translation memory
- prompt generation

---

# Architecture

```text
TranslationRequest

↓

Glossary

↓

PromptBuilder

↓

TranslationProvider
```

---

# Public API

```ts
interface Glossary {
  find(source: string): GlossaryEntry | undefined;

  save(entry: GlossaryEntry): void;
}
```

---

# Dependency

Depends On

- TASK-0029 — PromptBuilder
- TASK-0035 — TranslationMemory

---

# Risk

Low

---

# Acceptance Criteria

- [ ] Glossary implemented.
- [ ] Exact terminology lookup.
- [ ] Immutable entries.
- [ ] Strict mode passes.

---

# Definition of Done

Atlas Studio can maintain consistent terminology across every translation.

---

# AI Constraints

Before implementation:

- Do not implement fuzzy matching.
- Do not implement TranslationMemory.
- Focus only on terminology management.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0037-style-guide.md
