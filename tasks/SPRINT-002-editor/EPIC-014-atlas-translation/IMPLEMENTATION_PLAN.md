# Implementation Plan

## EPIC-014 — atlas-translation

---

# Objective

Membangun AI-first Translation Engine yang mampu menerjemahkan ratusan gambar manga secara paralel melalui Translation Pipeline yang dapat dikustomisasi, mendukung banyak AI Provider, OCR Provider, Workflow, Translation Memory, dan Plugin.

---

# Implementation Status

Status: Completed

Implementation:

- `packages/atlas-translation`

The package implements the translation-engine contracts and orchestration primitives while keeping provider execution, rendering, editor mutation, UI, cloud infrastructure, and enterprise identity concerns outside this package.

---

# Roadmap

```text
Foundation
        │
        ▼
Pipeline
        │
        ▼
Batch Translation
        │
        ▼
Providers
        │
        ▼
Translation Quality
        │
        ▼
Workflow
        │
        ▼
Integration
        │
        ▼
Performance
```

---

# Sprint Overview

| Sprint   | Name        | Goal                              |
| -------- | ----------- | --------------------------------- |
| Sprint 1 | Foundation  | Translation Engine Foundation     |
| Sprint 2 | Pipeline    | Single Image Translation Pipeline |
| Sprint 3 | Batch       | Multi Image Translation           |
| Sprint 4 | Providers   | AI & OCR Providers                |
| Sprint 5 | Quality     | Translation Quality System        |
| Sprint 6 | Workflow    | Translation Workflow              |
| Sprint 7 | Integration | Integration with Atlas Packages   |
| Sprint 8 | Performance | Performance & Diagnostics         |

---

# Sprint 1

## Goal

Membangun fondasi Translation Engine.

## Business Value

Translation Engine memiliki kontrak dasar yang stabil.

## Deliverables

- TranslationItem
- TranslationRequest
- TranslationResult
- TranslationProvider
- TranslationFactory

## Demo

```text
Image

↓

TranslationRequest

↓

TranslationProvider

↓

TranslationResult
```

## Success Criteria

- Translation Engine dapat menerima request.
- Provider dapat mengembalikan hasil.
- Seluruh kontrak stabil.

---

# Sprint 2

## Goal

Membangun Translation Pipeline.

## Business Value

Satu gambar dapat diproses melalui pipeline lengkap.

## Deliverables

- Pipeline
- Pipeline Stage
- Pipeline Context
- Translation Session

## Demo

```text
Image

↓

Pipeline

↓

OCR

↓

Translate

↓

Result
```

## Success Criteria

- Pipeline menjalankan stage berurutan.
- Stage dapat diganti.
- Pipeline independen dari provider.

---

# Sprint 3

## Goal

Mendukung multi image translation.

## Business Value

Pengguna dapat menerjemahkan ratusan gambar dalam sekali proses.

## Deliverables

- Translation Batch
- Queue
- Worker Pool
- Pause
- Resume
- Retry
- Recovery

## Demo

```text
150 Images

↓

Translation Batch

↓

Worker Pool

↓

Completed
```

## Success Criteria

User dapat:

- memilih banyak gambar
- menjalankan translate
- pause
- resume
- retry gambar gagal
- recovery setelah aplikasi dibuka kembali

---

# Sprint 4

## Goal

Mendukung banyak AI Provider.

## Business Value

Provider dapat diganti tanpa mengubah Translation Engine.

## Deliverables

- Provider Registry
- Provider Resolver
- Prompt Builder
- Translation Cache

## Demo

```text
OpenAI

↓

Gemini

↓

Claude
```

Provider dapat diganti kapan saja.

## Success Criteria

- Provider dapat diregistrasi.
- Provider dapat diganti.
- Engine tidak mengetahui implementasi provider.

---

# Sprint 5

## Goal

Meningkatkan kualitas hasil terjemahan.

## Business Value

Terjemahan lebih konsisten dan hemat biaya.

## Deliverables

- Translation Memory
- Glossary
- Style Guide
- Validation
- Consistency Checker

## Demo

```text
Translation Request

↓

Translation Memory

↓

Glossary

↓

AI

↓

Validation
```

## Success Criteria

- Translation Memory digunakan.
- Glossary diterapkan.
- Style Guide mempengaruhi hasil.

---

# Sprint 6

## Goal

Workflow Translation.

## Business Value

Setiap project memiliki workflow sendiri.

## Deliverables

- Workflow
- Workflow Runner
- Workflow Progress
- Workflow Recovery

## Demo

```text
Project

↓

Workflow

↓

Batch

↓

Pipeline

↓

Completed
```

## Success Criteria

Workflow dapat:

- pause
- resume
- recovery
- menjalankan batch

---

# Sprint 7

## Goal

Integrasi dengan package Atlas lainnya.

## Business Value

Translation Engine menjadi bagian dari Atlas Studio.

## Deliverables

- OCR Integration
- Inpaint Integration
- Typesetting Integration
- Export Integration
- Editor Integration

## Demo

```text
Editor

↓

Translation

↓

Typesetting

↓

Export
```

## Success Criteria

Seluruh package dapat berkomunikasi melalui kontrak publik.

---

# Sprint 8

## Goal

Optimasi performa.

## Business Value

Translation Engine stabil untuk project besar.

## Deliverables

- Metrics
- Diagnostics
- Resource Monitor
- Runtime Profiler

## Demo

```text
500 Images

↓

Translate

↓

Performance Report
```

## Success Criteria

- Worker berjalan paralel.
- Resource termonitor.
- Bottleneck dapat diidentifikasi.

---

# Dependency Graph

```text
Sprint 1
    │
    ▼
Sprint 2
    │
    ▼
Sprint 3
    │
    ▼
Sprint 4
    │
    ▼
Sprint 5
    │
    ▼
Sprint 6
    │
    ▼
Sprint 7
    │
    ▼
Sprint 8
```

Tidak ada sprint yang boleh dilewati.

---

# Definition of Done

EPIC dianggap selesai apabila:

- Multi Image Translation berjalan.
- Translation Pipeline stabil.
- Workflow berjalan.
- Provider dapat diganti.
- Translation Memory aktif.
- Glossary aktif.
- Recovery berjalan.
- Pause & Resume berjalan.
- Retry berjalan.
- Plugin dapat menambahkan Provider baru.
- Translation Engine dapat digunakan tanpa UI.
