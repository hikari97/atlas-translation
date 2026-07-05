---
id: TASK-0041

title: Implement TranslationApproval

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

# TASK-0041 — Implement TranslationApproval

## Summary

Implement `TranslationApproval`.

TranslationApproval represents the final approval state of a TranslationResult.

Approval is the final step of the translation workflow after quality evaluation and review have completed.

TranslationApproval does not modify the translation itself.

---

# Capability

After this task is complete, Atlas Studio can determine whether a translation is approved for production use.

---

# Goal

Provide a consistent approval model independent from review and provider implementations.

---

# Business Value

TranslationApproval enables:

- production-ready translations
- publishing workflow
- approval history
- audit trail
- collaborative review

---

# Background

Translation workflow:

TranslationResult

↓

TranslationQuality

↓

TranslationReview

↓

TranslationApproval

↓

Ready for Export

Approval is always the final decision.

---

# Scope

## Included

- Approval contract
- Approval status
- Approval metadata
- Approval history

## Excluded

- Translation editing
- Translation review
- Export
- Provider execution

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationApproval.ts
        └── index.ts
```

---

# Responsibilities

TranslationApproval is responsible for:

- recording approval decisions
- recording approver information
- recording approval time
- exposing approval status

TranslationApproval is NOT responsible for:

- modifying translations
- reviewing translations
- executing providers
- exporting translations

---

# Architecture

```text
TranslationResult

↓

TranslationQuality

↓

TranslationReview

↓

TranslationApproval

↓

Export
```

---

# Public API

```ts
interface TranslationApproval {
  readonly status: ApprovalStatus;

  readonly approvedBy: string;

  readonly approvedAt: Date;

  readonly notes?: string;
}
```

---

# Approval Status

Supported values:

- Pending
- Approved
- Rejected

---

# Approval Flow

```text
Translation Finished

↓

Quality Evaluation

↓

Review

↓

Approval

↓

Ready for Export
```

---

# Dependency

Depends On

- TASK-0038 — TranslationQuality
- TASK-0040 — TranslationReview

---

# Risk

Low

TranslationApproval is a passive workflow object.

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

- [ ] TranslationApproval implemented.
- [ ] Immutable.
- [ ] Serializable.
- [ ] Supports approval metadata.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can record final approval decisions independently from TranslationReview and TranslationResult.

---

# AI Constraints

Before implementation:

- Do not modify TranslationResult.
- Do not implement Export.
- Do not implement Review.
- Focus only on the approval contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0038-translation-quality.md
- TASK-0040-translation-review.md

---

# Sprint Completion

After Sprint 5 is completed, Atlas Studio is capable of:

✓ Reusing previous translations through TranslationMemory

✓ Enforcing project terminology using Glossary

✓ Applying writing conventions with StyleGuide

✓ Evaluating translation quality

✓ Recording manual reviews

✓ Managing final approval before publishing

The Translation Intelligence Layer is now complete.

---

# Next Task

TASK-0042-translation-workflow.md
