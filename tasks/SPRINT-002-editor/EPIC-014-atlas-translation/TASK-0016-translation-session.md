---
id: TASK-0016

title: Implement TranslationSession

status: Completed

priority: Critical

story_points: 13

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation
---

# TASK-0016 — Implement TranslationSession

## Summary

Implement TranslationSession.

TranslationSession is the Aggregate Root of the Translation Engine.

A TranslationSession represents one translation process initiated by the user.

Examples:

- Selected Images
- One Chapter
- One Volume
- Entire Project

Every runtime component belongs to one TranslationSession.

---

# Capability

After this task is complete, Atlas Studio can manage a complete translation process as one logical session.

---

# Goal

Provide one root object that coordinates every runtime component involved in translation.

---

# Business Value

The entire translation process can be paused, resumed, cancelled, recovered, and monitored as a single unit.

---

# Background

TranslationSession owns the runtime.

TranslationSession does not execute TranslationPipeline.

TranslationSession delegates execution to TranslationScheduler.

---

# Responsibilities

TranslationSession owns:

- TranslationBatch
- TranslationScheduler
- Session Progress
- Session Statistics
- Session Diagnostics

TranslationSession never executes PipelineStage.

---

# Architecture

TranslationSession

├── TranslationBatch

├── TranslationScheduler

├── Progress

├── Statistics

└── Diagnostics

---

# Public API

interface TranslationSession {

    readonly id: string;

    readonly batch: TranslationBatch;

    readonly scheduler: TranslationScheduler;

}

---

# Lifecycle

Created

↓

Ready

↓

Running

↓

Paused

↓

Completed

or

Cancelled

---

# Dependency

Depends On

TASK-0001

TASK-0015

---

# Risk

High

TranslationSession becomes the Aggregate Root of atlas-translation.

---

# Acceptance Criteria

- [ ] TranslationSession implemented.
- [ ] Owns Batch.
- [ ] Owns Scheduler.
- [ ] No pipeline execution logic.
- [ ] Strict mode passes.

---

# Definition of Done

Every translation initiated by Atlas Studio is represented by exactly one TranslationSession.

---

# Next Task

TASK-0017-translation-batch.md
