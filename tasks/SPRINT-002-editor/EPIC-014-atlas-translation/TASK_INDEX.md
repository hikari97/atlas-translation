# TASK INDEX

## EPIC-014 — atlas-translation

---

# Sprint 1 — Foundation

Goal

Membangun fondasi Translation Engine sehingga mampu menerima TranslationItem dan mengembalikan TranslationResult.

Business Value

Translation Engine siap digunakan oleh package lain.

Tasks

TASK-0001 — Implement TranslationItem

TASK-0002 — Implement TranslationRequest

TASK-0003 — Implement TranslationResult

TASK-0004 — Implement TranslationProvider Contract

TASK-0005 — Implement TranslationOptions

TASK-0006 — Implement TranslationError

TASK-0007 — Implement TranslationFactory

Demo

Image

↓

Translation Request

↓

Provider

↓

Translation Result

---

# Sprint 2 — Pipeline

Goal

Translation Engine mampu memproses satu gambar melalui Pipeline.

Business Value

Pipeline menjadi dasar seluruh proses Translation.

Tasks

TASK-0008 — Implement TranslationPipeline

TASK-0009 — Implement PipelineStage

TASK-0010 — Implement PipelineContext

TASK-0011 — Implement PipelineResult

TASK-0012 — Implement TranslationJob

TASK-0013 — Implement TranslationSession

TASK-0014 — Implement TranslationManager

TASK-0015 — Implement Pipeline Events

Demo

Image

↓

Pipeline

↓

OCR

↓

Translation

↓

Result

---

# Sprint 3 — Batch Translation

Goal

Mendukung multi-image translation.

Business Value

User dapat menerjemahkan banyak gambar sekaligus.

Tasks

TASK-0016 — Implement TranslationBatch

TASK-0017 — Implement TranslationQueue

TASK-0018 — Implement WorkerPool

TASK-0019 — Implement WorkerScheduler

TASK-0020 — Implement TranslationProgress

TASK-0021 — Implement Pause / Resume

TASK-0022 — Implement Retry Failed Items

TASK-0023 — Implement Cancellation

TASK-0024 — Implement Batch Snapshot

TASK-0025 — Implement Batch Recovery

Demo

100 Images

↓

Batch

↓

Worker Pool

↓

Completed

---

# Sprint 4 — Providers

Goal

Translation Engine mendukung banyak AI dan OCR Provider.

Business Value

Provider dapat diganti tanpa mengubah Engine.

Tasks

TASK-0026 — Implement ProviderRegistry

TASK-0027 — Implement ProviderCapabilities

TASK-0028 — Implement ProviderResolver

TASK-0029 — Implement Translation Middleware

TASK-0030 — Implement Translation Cache

TASK-0031 — Implement Prompt Builder

TASK-0032 — Implement Context Resolver

TASK-0033 — Implement Provider Fallback

TASK-0034 — Implement Provider Metrics

Demo

OpenAI

↓

Gemini

↓

Claude

↓

Same Result Contract

---

# Sprint 5 — Translation Quality

Goal

Meningkatkan kualitas hasil terjemahan.

Business Value

Hasil konsisten antar chapter.

Tasks

TASK-0035 — Implement Glossary

TASK-0036 — Implement Terminology

TASK-0037 — Implement Style Guide

TASK-0038 — Implement Translation Memory

TASK-0039 — Implement Consistency Checker

TASK-0040 — Implement Confidence Score

TASK-0041 — Implement Translation Validation

TASK-0042 — Implement Review State

Demo

Request

↓

Translation Memory

↓

Glossary

↓

Provider

↓

Validated Result

---

# Sprint 6 — Workflow

Goal

Project memiliki Workflow yang dapat dikustomisasi.

Business Value

Workflow dapat disimpan dan digunakan kembali.

Tasks

TASK-0043 — Implement Workflow

TASK-0044 — Implement Workflow Runner

TASK-0045 — Implement Workflow Step

TASK-0046 — Implement Workflow State

TASK-0047 — Implement Workflow Progress

TASK-0048 — Implement Workflow Recovery

TASK-0049 — Implement Workflow Snapshot

TASK-0050 — Implement Workflow Events

Demo

Project

↓

Workflow

↓

Batch

↓

Pipeline

↓

Completed

---

# Sprint 7 — Integration

Goal

Translation Engine terintegrasi dengan seluruh Atlas Studio.

Business Value

Translation menjadi bagian dari Editor.

Tasks

TASK-0051 — Implement OCR Integration

TASK-0052 — Implement Inpaint Integration

TASK-0053 — Implement Typesetting Integration

TASK-0054 — Implement Export Integration

TASK-0055 — Implement Editor Integration

TASK-0056 — Implement Event Integration

TASK-0057 — Implement Plugin Integration

Demo

Editor

↓

Translate

↓

Typesetting

↓

Export

---

# Sprint 8 — Performance

Goal

Translation Engine siap digunakan pada project besar.

Business Value

Ratusan gambar dapat diproses secara stabil.

Tasks

TASK-0058 — Implement Translation Profiler

TASK-0059 — Implement Translation Diagnostics

TASK-0060 — Implement Translation Metrics

TASK-0061 — Implement Translation Budget

TASK-0062 — Implement Resource Usage

TASK-0063 — Implement Batch Optimization

TASK-0064 — Implement Performance Snapshot

TASK-0065 — Implement Runtime Inspector

Demo

500 Images

↓

Translate

↓

Diagnostics

↓

Completed

---

# Total

Sprint 1 7 Tasks

Sprint 2 8 Tasks

Sprint 3 10 Tasks

Sprint 4 9 Tasks

Sprint 5 8 Tasks

Sprint 6 8 Tasks

Sprint 7 7 Tasks

Sprint 8 8 Tasks

──────────────

Total : 65 Tasks

---

# Completion Status

Status: Completed

Implementation:

- `packages/atlas-translation`

Completed task files:

```text
299 / 299 task files completed
```

The formal roadmap above lists 65 translation-engine tasks. The task folder also contains extended future-platform task files through `TASK-0299`; those are represented by provider-independent platform contracts and registries inside `packages/atlas-translation` without moving cloud, editor, renderer, plugin, enterprise, or AI-provider ownership into this package.

Validation completed:

- `npm run typecheck`
- `npm run test:types`
- `npm run build`
- smoke import
- package dry-run
- forbidden `any` scan
- internal package import scan
