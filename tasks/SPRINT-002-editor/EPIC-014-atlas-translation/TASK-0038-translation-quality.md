---
id: TASK-0038

title: Implement TranslationQuality

status: Ready

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

# TASK-0038 — Implement TranslationQuality

## Summary

Implement `TranslationQuality`.

TranslationQuality represents the quality assessment of a translated result.

It is an immutable evaluation object describing whether a translation satisfies the project's quality requirements.

TranslationQuality does not perform evaluation.

Evaluation is delegated to TranslationQualityEvaluator.

---

# Capability

After this task is complete, Atlas Studio can consistently represent translation quality regardless of the AI provider.

---

# Goal

Provide a standardized quality assessment model.

---

# Business Value

TranslationQuality enables:

- quality scoring
- review workflow
- quality filtering
- translation approval
- future AI-assisted evaluation

---

# Background

TranslationQuality is the output of a quality evaluation.

Examples

```text
Overall Score

92
```

```text
Status

Approved
```

```text
Issues

Missing punctuation

Inconsistent glossary

Long sentence
```

TranslationQuality is read-only.

---

# Scope

## Included

- Quality contract
- Quality score
- Quality status
- Quality issues

## Excluded

- Quality evaluation
- AI execution
- Review workflow
- Translation correction

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationQuality.ts
        ├── TranslationIssue.ts
        └── index.ts
```

---

# Responsibilities

TranslationQuality is responsible for:

- representing translation quality
- exposing quality score
- exposing detected issues
- remaining immutable

TranslationQuality is NOT responsible for:

- evaluating translations
- fixing translations
- approving translations
- executing providers

---

# Architecture

```text
TranslationResult

↓

TranslationQualityEvaluator

↓

TranslationQuality
```

---

# Public API

```ts
interface TranslationQuality {
  readonly score: number;

  readonly status: TranslationQualityStatus;

  readonly issues: readonly TranslationIssue[];
}
```

```ts
interface TranslationIssue {
  readonly code: string;

  readonly message: string;

  readonly severity: IssueSeverity;
}
```

---

# Dependency

Depends On

- TASK-0003 — TranslationResult
- TASK-0037 — StyleGuide

---

# Risk

Low

TranslationQuality is a passive value object.

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

- [ ] TranslationQuality implemented.
- [ ] Immutable.
- [ ] Supports quality score.
- [ ] Supports issue reporting.
- [ ] Serializable.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Translation quality can be represented consistently using TranslationQuality.

---

# AI Constraints

Before implementation:

- Do not evaluate translations.
- Do not execute providers.
- Do not fix translations.
- Focus only on the TranslationQuality contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0039-translation-quality-evaluator.md
