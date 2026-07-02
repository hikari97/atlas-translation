---
id: TASK-0024

title: Implement Translation Recovery

status: Ready

priority: High

story_points: 13

sprint: SPRINT-003-batch-translation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0024 — Implement Translation Recovery

## Summary

Implement Translation Recovery.

Translation Recovery restores an interrupted TranslationSession from its latest runtime snapshot.

Recovery enables Atlas Studio to continue long-running translation jobs after unexpected interruptions such as application crashes, operating system shutdowns, or user restarts.

Recovery is different from Retry.

Recovery restores runtime.

Retry re-executes failed work.

---

# Capability

After this task is complete, users can reopen Atlas Studio and continue unfinished translation sessions without restarting the entire translation process.

---

# Goal

Provide reliable runtime recovery using immutable snapshots.

---

# Business Value

Users can safely translate hundreds or thousands of images without worrying about losing progress.

---

# Background

Unexpected interruptions may occur because of:

- Application crash
- Power outage
- Operating system restart
- User closes Atlas Studio
- Forced update

TranslationSession remains persistent.

TranslationRuntime is recreated.

Recovery restores runtime state from the latest snapshot.

---

# Scope

## Included

- Runtime restoration
- Snapshot loading
- Queue restoration
- Scheduler restoration
- Worker recreation
- Progress restoration

## Excluded

- Retry failed items
- Pipeline redesign
- Translation Provider recovery
- Project loading

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationRecovery.ts
        └── index.ts
```

---

# Responsibilities

TranslationRecovery is responsible for:

- loading snapshots
- restoring runtime
- restoring queue state
- restoring progress
- recreating scheduler

TranslationRecovery is NOT responsible for:

- retrying failed items
- creating TranslationSession
- translating images

---

# Architecture

```text
TranslationSession

↓

Snapshot

↓

TranslationRecovery

↓

TranslationRuntime

↓

Continue Execution
```

---

# Recovery Flow

```text
Application Starts

↓

Load TranslationSession

↓

Load Latest Snapshot

↓

Restore Queue

↓

Restore Progress

↓

Create Runtime

↓

Continue Translation
```

---

# Public API

```ts
interface TranslationRecovery {
  recover(session: TranslationSession): Promise<TranslationRuntime>;
}
```

> **Catatan Arsitektur:** Recovery hanya mengembalikan runtime ke kondisi terakhir yang tersimpan. Mekanisme penyimpanan snapshot ditentukan oleh komponen lain.

---

# Dependency

Depends On

- TASK-0013 — PipelineSnapshot
- TASK-0018 — TranslationRuntime
- TASK-0020 — TranslationQueue
- TASK-0022 — TranslationProgress

---

# Risk

High

Incorrect recovery may corrupt runtime state or duplicate work.

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

- [ ] Recovery contract implemented.
- [ ] Runtime restored from snapshot.
- [ ] Queue restored correctly.
- [ ] Progress restored correctly.
- [ ] TranslationSession remains unchanged.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can continue interrupted translation sessions from the latest available snapshot without restarting the entire translation job.

---

# AI Constraints

Before implementation:

- Do not implement retry.
- Do not recreate TranslationSession.
- Do not rerun completed TranslationItems.
- Focus only on runtime restoration.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0013-pipeline-snapshot.md
- TASK-0018-translation-runtime.md
- TASK-0022-translation-progress.md

---

# Next Task

TASK-0025-translation-cancellation.md
