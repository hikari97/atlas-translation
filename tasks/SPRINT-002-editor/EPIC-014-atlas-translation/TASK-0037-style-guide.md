---
id: TASK-0037

title: Implement StyleGuide

status: Completed

priority: High

story_points: 8

sprint: SPRINT-005-translation-intelligence

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0037 — Implement StyleGuide

## Summary

Implement `StyleGuide`.

StyleGuide defines translation rules that influence writing style, tone, grammar, and formatting.

Unlike Glossary, StyleGuide controls how translations should be written rather than what specific words should be used.

---

# Capability

After this task is complete, Atlas Studio can consistently apply writing style across an entire project.

---

# Goal

Provide reusable translation style rules.

---

# Business Value

StyleGuide improves:

- translation consistency
- readability
- character personality
- dialogue consistency
- localization quality

---

# Background

Examples

Dialogue

```text
Don't translate honorifics.
```

Formatting

```text
Always preserve line breaks.
```

Localization

```text
Use Indonesian casual language.
```

Naming

```text
Do not translate skill names.
```

All of these become part of StyleGuide.

---

# Scope

## Included

- Style guide contract
- Style guide rules
- Rule lookup
- Rule metadata

## Excluded

- Prompt generation
- Translation Memory
- Glossary
- AI translation

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── StyleGuide.ts
        ├── StyleRule.ts
        └── index.ts
```

---

# Responsibilities

StyleGuide is responsible for:

- storing writing rules
- exposing style rules
- maintaining writing consistency

StyleGuide is NOT responsible for:

- translating text
- executing providers
- storing terminology
- generating prompts

---

# Architecture

```text
TranslationRequest

↓

StyleGuide

↓

PromptBuilder

↓

TranslationProvider
```

---

# Rule Examples

Examples of supported rules:

- Formal language
- Casual language
- Preserve honorifics
- Preserve line breaks
- Preserve punctuation
- Do not translate names
- Keep emoji
- Preserve markdown

---

# Public API

```ts
interface StyleGuide {
  readonly rules: readonly StyleRule[];
}
```

```ts
interface StyleRule {
  readonly id: string;

  readonly name: string;

  readonly description: string;
}
```

---

# Dependency

Depends On

- TASK-0029 — PromptBuilder
- TASK-0036 — Glossary

---

# Risk

Low

---

# Acceptance Criteria

- [ ] StyleGuide implemented.
- [ ] Immutable rules.
- [ ] Serializable.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

PromptBuilder can generate prompts using StyleGuide rules without depending on provider implementations.

---

# AI Constraints

Before implementation:

- Do not implement PromptBuilder.
- Do not execute providers.
- Focus only on StyleGuide contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0038-translation-quality.md
