---
id: TASK-0017

title: Implement TranslationBatch

status: Ready

priority: Critical

story_points: 8

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation
---

# TASK-0017 — Implement TranslationBatch

## Summary

Implement TranslationBatch.

TranslationBatch represents a collection of TranslationItem instances that belong to a single TranslationSession.

TranslationBatch is a domain object.

It contains no runtime behavior.

---

# Capability

After this task is complete, users can translate multiple selected images as one logical batch.

---

# Goal

Provide a stable container for TranslationItem.

---

# Business Value

Multiple images become one translation operation.

---

# Background

Users should be able to:

✓ Select 5 images

✓ Select 50 images

✓ Select 500 images

↓

Translate

↓

One TranslationSession

---

# Responsibilities

TranslationBatch owns:

- TranslationItems
- Batch metadata
- Batch statistics

TranslationBatch never:

- executes Pipeline
- manages Queue
- manages Worker
- performs scheduling

---

# Architecture

TranslationSession

↓

TranslationBatch

↓

TranslationItem

---

# Public API

interface TranslationBatch {

    readonly id: string;

    readonly items:
        readonly TranslationItem[];

}

TranslationBatch is immutable.

Adding or removing items creates a new TranslationBatch.

---

# Dependency

Depends On

TASK-0001

TASK-0016

---

# Risk

Medium

TranslationBatch becomes the container of every TranslationItem.

---

# Acceptance Criteria

- [ ] Immutable.
- [ ] Contains TranslationItem.
- [ ] No runtime logic.
- [ ] Serializable.

---

# Definition of Done

TranslationBatch represents one immutable collection of TranslationItem.

---

# Next Task

TASK-0018-translation-runtime.md
