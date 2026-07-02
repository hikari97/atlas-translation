# EPIC-014 — atlas-translation

> AI-first Translation Engine for Atlas Studio

---

# Overview

`atlas-translation` adalah package yang bertanggung jawab menjalankan seluruh proses penerjemahan di Atlas Studio.

Package ini bukan sekadar wrapper untuk AI Provider.

Sebaliknya, package ini merupakan **Translation Engine** yang mampu memproses ratusan gambar manga secara paralel melalui pipeline yang dapat dikustomisasi.

Translation Engine dirancang agar dapat digunakan oleh:

- Atlas Editor
- Batch Processing
- CLI
- Desktop Application
- Plugin
- Future Automation

tanpa bergantung pada UI tertentu.

---

# Vision

Atlas Studio bukan editor gambar yang dapat menerjemahkan manga.

Atlas Studio adalah **AI-first Manga Translation Platform**.

Translation merupakan workflow lengkap mulai dari OCR hingga hasil akhir yang siap dipublikasikan.

---

# Goals

Package ini harus mampu:

- menerjemahkan banyak gambar sekaligus
- menjalankan pipeline secara paralel
- mendukung berbagai AI Provider
- mendukung OCR Provider
- mendukung Translation Memory
- mendukung Glossary
- mendukung Workflow
- mendukung Recovery
- mendukung Retry
- mendukung Pause / Resume
- mendukung Plugin

---

# Non Goals

Package ini tidak bertanggung jawab terhadap:

- Image Rendering
- UI
- Bubble Editing
- History
- Selection
- Input
- Project Explorer

Semua tanggung jawab tersebut berada pada package lain.

---

# Responsibilities

Package ini bertanggung jawab terhadap:

- Translation Pipeline
- Batch Translation
- Translation Queue
- Worker Pool
- Translation Session
- Workflow Execution
- Translation Provider
- Translation Memory
- Glossary
- Style Guide
- Translation Cache
- Progress
- Recovery

---

# Translation Hierarchy

Translation Engine bekerja menggunakan hirarki berikut.

```text
Project
│
├── Translation Session
│
├── Translation Batch
│   │
│   ├── Translation Item
│   │   │
│   │   ├── Pipeline
│   │   │
│   │   ├── OCR
│   │   ├── Translation
│   │   ├── Inpaint
│   │   ├── Typesetting
│   │   └── Export
│   │
│   └── ...
│
└── Workflow
```

---

# Translation Item

Unit terkecil yang diproses Translation Engine adalah **TranslationItem**.

TranslationItem bukan sekadar file gambar.

Di masa depan TranslationItem dapat berasal dari:

- PNG
- JPG
- WEBP
- Clipboard
- PDF
- ZIP
- Remote URL
- Future Sources

Engine tidak bergantung pada sumber data.

---

# Translation Pipeline

Setiap TranslationItem diproses melalui Pipeline.

Contoh Pipeline Production:

```text
Load

↓

Bubble Detection

↓

OCR

↓

OCR Cleanup

↓

Context Resolution

↓

Translation

↓

Glossary

↓

Quality Check

↓

Inpaint

↓

Typesetting

↓

Render

↓

Save
```

Pipeline dapat dikustomisasi.

---

# Batch Translation

Translation Engine dirancang untuk memproses banyak gambar secara bersamaan.

Contoh:

```text
150 Images

↓

Worker Pool

↓

Parallel Pipeline

↓

Completed
```

Batch Translation mendukung:

- Pause
- Resume
- Retry
- Recovery
- Snapshot

---

# Workflow

Workflow menentukan bagaimana sebuah Project diterjemahkan.

Contoh Workflow:

Production

```text
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

Preview

```text
OCR

↓

Translation

↓

Render Preview
```

Workflow dapat ditambahkan melalui Plugin.

---

# Translation Providers

Translation Engine tidak mengenal implementasi AI tertentu.

Semua AI diakses melalui TranslationProvider.

Contoh Provider:

- OpenAI
- Gemini
- Claude
- DeepL
- Ollama
- NLLB
- Future Providers

---

# OCR Providers

OCR juga menggunakan Provider.

Contoh:

- EasyOCR
- PaddleOCR
- Tesseract
- Google Vision
- Future Providers

---

# Translation Memory

Translation Memory menyimpan hasil terjemahan sebelumnya.

Tujuannya:

- menghemat biaya API
- meningkatkan konsistensi
- mempercepat proses

---

# Glossary

Glossary menyimpan istilah penting dalam Project.

Contoh:

- nama karakter
- nama jurus
- nama kota
- istilah organisasi
- istilah dunia

---

# Style Guide

Style Guide mengatur gaya bahasa.

Contoh:

- Formal
- Casual
- Honorific Jepang
- Webtoon
- Novel

---

# Key Features

- Multi Image Translation
- Parallel Processing
- Translation Pipeline
- Workflow
- Worker Pool
- Queue
- Retry
- Pause
- Resume
- Recovery
- Translation Memory
- Glossary
- Provider Plugin
- OCR Plugin
- AI Plugin

---

# Dependencies

Package ini bergantung pada:

- atlas-core
- atlas-events
- atlas-types

Integrasi dengan:

- atlas-editor
- atlas-renderer
- atlas-plugin
- atlas-history

---

# Design Principles

Translation Engine harus:

- deterministic
- framework independent
- plugin friendly
- asynchronous
- resumable
- restartable
- testable
- extensible

---

# Success Criteria

Package dianggap selesai apabila mampu:

- menerjemahkan ratusan gambar secara paralel
- menghentikan proses tanpa kehilangan progress
- melanjutkan proses dari checkpoint terakhir
- mendukung banyak Translation Provider
- mendukung banyak OCR Provider
- menjaga konsistensi hasil menggunakan Translation Memory dan Glossary
- berjalan tanpa bergantung pada UI
