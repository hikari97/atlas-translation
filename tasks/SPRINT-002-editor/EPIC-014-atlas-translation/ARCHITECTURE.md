# Architecture

## atlas-translation

---

# Purpose

atlas-translation adalah Translation Engine milik Atlas Studio.

Package ini bertanggung jawab menjalankan seluruh workflow penerjemahan manga mulai dari gambar mentah hingga hasil akhir.

Translation Engine tidak bergantung pada UI maupun Editor.

Semua proses dapat dijalankan secara headless.

---

# Architecture Overview

```text
                Translation Manager
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
 Translation Session  Workflow     Provider Registry
        │
        ▼
 Translation Batch
        │
        ▼
 Translation Queue
        │
        ▼
 Worker Pool
        │
        ▼
 Translation Item
        │
        ▼
 Translation Pipeline
        │
        ▼
 Pipeline Stages
```

---

# Runtime Hierarchy

Translation Engine menggunakan hirarki berikut.

```text
Project
│
├── Translation Session
│
├── Translation Batch
│   │
│   ├── Translation Item
│   │   │
│   │   └── Translation Pipeline
│   │
│   └── ...
│
└── Workflow
```

Semua pekerjaan selalu dimulai dari Translation Session.

---

# Translation Session

Translation Session mewakili satu proses penerjemahan.

Contoh:

```text
One Piece Chapter 1100
```

atau

```text
100 Selected Images
```

Session bertanggung jawab terhadap:

- lifecycle
- progress
- recovery
- statistics

Session tidak menerjemahkan gambar.

---

# Translation Batch

Translation Batch adalah kumpulan TranslationItem.

```text
Batch

├── Item 1

├── Item 2

├── Item 3

└── Item N
```

Batch dapat:

- pause
- resume
- retry
- cancel

---

# Translation Item

TranslationItem adalah unit kerja utama.

Translation Engine tidak bekerja terhadap file.

Translation Engine bekerja terhadap TranslationItem.

TranslationItem dapat berasal dari:

- Image File
- Clipboard
- PDF
- ZIP
- Remote Source
- Future Sources

---

# Translation Pipeline

Setiap TranslationItem memiliki Pipeline sendiri.

```text
Translation Item

↓

Pipeline
```

Pipeline bertanggung jawab menjalankan Stage secara berurutan.

Pipeline tidak mengetahui AI Provider.

Pipeline tidak mengetahui OCR Provider.

---

# Pipeline Stage

Pipeline terdiri dari banyak Stage.

Contoh:

```text
Load

↓

Bubble Detection

↓

OCR

↓

Translation

↓

Glossary

↓

Quality

↓

Inpaint

↓

Typesetting

↓

Export
```

Semua Stage menggunakan kontrak yang sama.

---

# Worker Pool

Translation Engine dapat menjalankan banyak Worker.

```text
Worker 1

Worker 2

Worker 3

Worker 4
```

Setiap Worker mengambil TranslationItem dari Queue.

---

# Translation Queue

Queue bertugas mengatur urutan pekerjaan.

Queue mendukung:

- priority
- retry
- pause
- resume
- cancellation

---

# Workflow

Workflow mengatur Pipeline yang digunakan Project.

Contoh.

Production

```text
OCR

↓

Translation

↓

Glossary

↓

QA

↓

Inpaint

↓

Typesetting

↓

Export
```

Preview

```text
OCR

↓

Translation

↓

Preview
```

Workflow dapat dibuat oleh Plugin.

---

# Provider Registry

Translation Engine tidak mengetahui implementasi Provider.

Provider Registry bertugas menyediakan:

- OCR Provider
- Translation Provider
- Inpaint Provider
- Typesetting Provider

Semua Provider dapat diganti tanpa mengubah Engine.

---

# Translation Memory

Translation Memory menyimpan hasil terjemahan sebelumnya.

Urutan penggunaan.

```text
Translation Request

↓

Translation Memory

↓

Found ?

↓

YES

↓

Return Result

↓

NO

↓

AI Provider
```

Tujuan:

- menghemat biaya
- meningkatkan konsistensi

---

# Glossary

Glossary menyimpan istilah Project.

Contoh:

Luffy

Gear Fifth

Marine

Yonko

Tidak bergantung kepada Provider.

---

# Style Guide

Style Guide menentukan gaya bahasa.

Contoh.

Formal

Casual

Japanese Honorific

Official Translation

Style Guide dijalankan sebelum AI Provider.

---

# Progress Model

Progress tersedia pada seluruh level.

```text
Session

↓

Batch

↓

Item

↓

Pipeline

↓

Stage
```

Semua level memiliki progress sendiri.

---

# Failure Recovery

Jika terjadi kegagalan.

```text
Item

↓

Stage 7

↓

Failed
```

Engine hanya mengulang Stage yang gagal.

Tidak mengulang seluruh Pipeline.

---

# Parallel Processing

Translation Engine dirancang untuk memanfaatkan seluruh CPU.

```text
Queue

↓

Worker 1

Worker 2

Worker 3

Worker N
```

Jumlah Worker dapat diubah.

---

# Plugin Architecture

Semua komponen berikut adalah Plugin.

- OCR

- AI Translation

- Inpaint

- Typesetting

- Workflow

- Prompt

- Export

Engine tidak memiliki implementasi bawaan.

---

# Engine Principles

Translation Engine harus:

- deterministic

- resumable

- restartable

- asynchronous

- observable

- testable

- plugin friendly

- provider independent

---

# Dependency Rules

Pipeline tidak boleh mengetahui:

- OpenAI

- Gemini

- Claude

- EasyOCR

- PaddleOCR

Pipeline hanya mengetahui:

- PipelineStage

- PipelineContext

- PipelineResult

---

# Data Flow

```text
Selected Images

↓

Translation Session

↓

Translation Batch

↓

Queue

↓

Worker

↓

Translation Item

↓

Pipeline

↓

Pipeline Stage

↓

Provider

↓

Result
```

---

# Architectural Principles

Seluruh Translation Engine mengikuti prinsip:

Workflow

↓

Batch

↓

Item

↓

Pipeline

↓

Stage

↓

Provider

Setiap layer hanya mengetahui layer di bawahnya.

Tidak boleh melompati layer.

---

# Future Extensions

Engine harus dapat dikembangkan untuk mendukung:

- Video Subtitle

- Webtoon

- Novel

- PDF

- EPUB

tanpa mengubah Architecture.
