---
id: TASK-0018

title: Implement TranslationRuntime

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation

owner: H.Makki
---

# TASK-0018 — Implement TranslationRuntime

## Summary

Implement TranslationRuntime.

TranslationRuntime is the runtime environment responsible for executing a TranslationSession.

Unlike TranslationSession, TranslationRuntime is ephemeral.

It exists only while translation is running.

---

# Capability

After this task is complete, Atlas Studio can execute a TranslationSession without modifying the domain model.

---

# Goal

Separate persistent translation data from runtime execution.

---

# Business Value

Translation projects become serializable while runtime remains lightweight and disposable.

---

# Background

TranslationSession represents the project.

TranslationRuntime executes the project.

When translation finishes, TranslationRuntime can be destroyed.

TranslationSession remains.

---

# Responsibilities

TranslationRuntime owns:

- TranslationScheduler
- Runtime lifecycle
- Runtime statistics
- Runtime diagnostics

TranslationRuntime never owns:

- TranslationItem
- TranslationBatch
- TranslationPipeline

---

# Architecture

TranslationSession

↓

TranslationRuntime

↓

TranslationScheduler

---

# Public API

```ts
interface TranslationRuntime {
  readonly session: TranslationSession;

  readonly scheduler: TranslationScheduler;
}
```

---

# Lifecycle

Created

↓

Starting

↓

Running

↓

Paused

↓

Completed

↓

Disposed

---

# Dependency

Depends On

TASK-0016

TASK-0017

---

# Risk

Medium

TranslationRuntime becomes the entry point of execution.

---

# Acceptance Criteria

- Runtime separated from domain.
- Runtime is disposable.
- Runtime owns Scheduler.
- No TranslationItem ownership.

---

# Definition of Done

TranslationSession can be executed by creating a TranslationRuntime.
