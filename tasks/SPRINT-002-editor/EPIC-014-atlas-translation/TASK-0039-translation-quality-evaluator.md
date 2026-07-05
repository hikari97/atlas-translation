---
id: TASK-0039

title: Implement TranslationQualityEvaluator

status: Completed

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

# TASK-0039 — Implement TranslationQualityEvaluator

## Summary

Implement `TranslationQualityEvaluator`.

TranslationQualityEvaluator evaluates TranslationResult against project quality rules and produces a TranslationQuality report.

The evaluator never modifies translations.

Its responsibility is assessment only.

---

# Capability

After this task is complete, Atlas Studio can automatically evaluate translation quality before a translation is accepted.

---

# Goal

Provide an extensible quality evaluation engine.

---

# Business Value

Automatic quality evaluation enables:

- translation validation
- reviewer assistance
- consistent quality scoring
- automatic approval workflow
- quality analytics

---

# Background

TranslationResult alone is insufficient to determine translation quality.

Evaluation should consider:

- glossary compliance
- style guide compliance
- formatting
- completeness
- punctuation
- untranslated text
- placeholder preservation

The output is a TranslationQuality object.

---

# Scope

## Included

- Quality evaluation
- Rule execution
- Issue detection
- Quality scoring
- Evaluation report

## Excluded

- Translation correction
- AI provider execution
- Review UI
- Human approval

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationQualityEvaluator.ts
        ├── QualityRule.ts
        └── index.ts
```

---

# Responsibilities

TranslationQualityEvaluator is responsible for:

- executing quality rules
- calculating quality score
- detecting issues
- producing TranslationQuality

TranslationQualityEvaluator is NOT responsible for:

- modifying translations
- executing providers
- storing reviews
- fixing issues

---

# Architecture

```text
TranslationResult

↓

TranslationQualityEvaluator

↓

QualityRule

↓

TranslationQuality
```

---

# Evaluation Flow

```text
TranslationResult

↓

Load Quality Rules

↓

Execute Rules

↓

Collect Issues

↓

Calculate Score

↓

TranslationQuality
```

---

# Public API

```ts
interface TranslationQualityEvaluator {
  evaluate(result: TranslationResult): TranslationQuality;
}
```

```ts
interface QualityRule {
  readonly id: string;

  evaluate(result: TranslationResult): TranslationIssue[];
}
```

---

# Default Rules

Examples:

- GlossaryRule
- StyleGuideRule
- PlaceholderRule
- FormattingRule
- LineBreakRule
- EmptyTranslationRule
- LengthRule

---

# Dependency

Depends On

- TASK-0003 — TranslationResult
- TASK-0036 — Glossary
- TASK-0037 — StyleGuide
- TASK-0038 — TranslationQuality

---

# Risk

Medium

Poor evaluation rules may produce misleading quality scores.

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

- [ ] TranslationQualityEvaluator implemented.
- [ ] Supports multiple QualityRule implementations.
- [ ] Produces TranslationQuality.
- [ ] Provider independent.
- [ ] Extensible rule engine.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can automatically evaluate translation quality using configurable QualityRule implementations.

---

# AI Constraints

Before implementation:

- Do not modify TranslationResult.
- Do not execute providers.
- Do not implement Review UI.
- Focus only on evaluation.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0036-glossary.md
- TASK-0037-style-guide.md
- TASK-0038-translation-quality.md

---

# Next Task

TASK-0040-translation-review.md
