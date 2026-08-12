---
title: Atlas Studio
description: AI-powered manga, comic, and image translation platform
version: 0.1.0
status: Development
owner: H.Makki
last_updated: 2026-08-12
---

---

# Atlas Studio

> AI-powered manga, comic, and image translation platform built for professional scanlation teams, publishers, and creators.

---

## Overview

Atlas Studio is an all-in-one platform for translating manga, comics, webtoons, and other visual content.

Instead of combining multiple tools for OCR, translation, editing, and exporting, Atlas Studio brings the entire workflow into a single application.

The project is designed around a plugin-based architecture, allowing different AI providers, OCR engines, rendering engines, and workflows to be integrated without changing the core system.

---

## Vision

Build the most modern and extensible translation platform for visual storytelling.

Atlas Studio aims to become a professional solution for:

- Manga Scanlation
- Comic Localization
- Webtoon Translation
- Publisher Localization
- AI-assisted Image Translation

---

## Core Principles

- AI First
- Human Assisted
- Plugin Based
- Offline First
- Cloud Ready
- Non-Destructive Editing
- Extensible Architecture

---

## Features

### Workspace Management

- Multiple workspaces
- Multiple projects
- Shared glossary
- Shared character database
- Translation memory

### Project Management

- Multi-page projects
- Version history
- Autosave
- Metadata management

### AI

- OCR
- Bubble Detection
- Bubble Classification
- Translation
- AI Review
- Vision QA
- Prompt Engineering

### Editor

- Layer system
- Bubble editor
- Text editor
- Brush tools
- Erase & Restore
- Inpainting
- Smart alignment

### Translation

- Translation Memory
- Character Database
- Glossary
- Prompt Templates
- Bubble Only Mode
- Ignore SFX Mode

### Export

- PNG
- JPG
- WEBP
- PDF
- CBZ
- ZIP
- Atlas Project

---

## Repository Structure

```text
atlas-image-translate/
├── apps/
│   ├── web/
│   ├── api/
│   └── ai-worker/
├── packages/
├── plugins/
├── docs/
├── schemas/
├── tasks/
├── tooling/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── tsconfig.json
```

---

## Installation

Jalankan seluruh perintah pada bagian ini dari root repository. Atlas Studio
menggunakan pnpm workspaces, Turborepo, dan virtual environment Python terpisah
untuk AI worker.

### 1. Prasyarat

Pastikan perangkat memiliki:

- Git
- Node.js 22 atau lebih baru
- Corepack dan pnpm 11.4.0
- Python 3.12
- MongoDB lokal atau MongoDB Atlas
- Tesseract OCR
- API key Gemini atau OpenRouter
- Koneksi internet saat instalasi dan pemrosesan gambar pertama

Periksa versi runtime:

```bash
node --version
python3.12 --version
```

Versi Node harus menunjukkan `v22` atau lebih baru. Instal Tesseract sesuai
sistem operasi:

```bash
# macOS dengan Homebrew
brew install tesseract

# Ubuntu/Debian
sudo apt update
sudo apt install tesseract-ocr
```

Pada Windows, instal Tesseract dan pastikan executable `tesseract` tersedia di
`PATH`.

### 2. Clone dan instal workspace

```bash
git clone https://github.com/hikari97/atlas-translation.git atlas-image-translate
cd atlas-image-translate

corepack enable
corepack prepare pnpm@11.4.0 --activate
pnpm install --frozen-lockfile
```

Semua dependency JavaScript dan TypeScript harus diinstal dari root repository,
bukan dari masing-masing aplikasi.

### 3. Siapkan AI worker

macOS dan Linux:

```bash
python3.12 -m venv apps/ai-worker/.venv
apps/ai-worker/.venv/bin/python -m pip install --upgrade pip
apps/ai-worker/.venv/bin/python -m pip install -r apps/ai-worker/requirements.txt
```

Windows PowerShell:

```powershell
py -3.12 -m venv apps/ai-worker/.venv
apps/ai-worker/.venv/Scripts/python.exe -m pip install --upgrade pip
apps/ai-worker/.venv/Scripts/python.exe -m pip install -r apps/ai-worker/requirements.txt
```

Launcher AI worker otomatis menggunakan virtual environment tersebut. Aktivasi
manual tidak diperlukan. Variabel `ATLAS_AI_PYTHON` hanya diperlukan bila Anda
secara sengaja ingin memakai executable Python 3.12 lain.

### 4. Konfigurasi environment

Buat file environment untuk API dan AI worker:

```bash
cp apps/api/env.example apps/api/.env
cp apps/ai-worker/.env.example apps/ai-worker/.env
```

Buat `apps/web/.env.local` dengan isi berikut:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

Kemudian atur `apps/api/.env`:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/atlas-studio
JWT_SECRET=ganti-dengan-secret-yang-panjang-dan-acak
JWT_EXPIRES_IN=7d
AI_WORKER_URL=http://localhost:8000
API_PUBLIC_URL=http://localhost:3001
```

Untuk MongoDB Atlas, ganti `MONGODB_URI` dengan connection string dari Atlas:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/atlas-studio
```

Pastikan IP perangkat diizinkan melalui MongoDB Atlas Network Access. Gunakan
nilai yang sudah di-URL-encode jika username atau password mengandung karakter
khusus. Jangan commit file `.env` atau membagikan connection string.

Pilih provider AI di `apps/ai-worker/.env`.

Gemini langsung:

```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key
MODEL_GEMINI=gemini-3.1-flash-lite
```

OpenRouter:

```env
LLM_PROVIDER=openrouter
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_APP_URL=http://localhost:3000
OPENROUTER_APP_TITLE=Atlas Studio
```

Konfigurasi detector pada `.env.example` dapat dibiarkan menggunakan nilai
default. Model INT8 ONNX `ogkalu/comic-text-and-bubble-detector` akan diunduh,
diverifikasi dengan SHA-256, lalu disimpan di cache lokal ketika gambar pertama
diproses. File model tidak disimpan ke Git.

### 5. Jalankan aplikasi

Jalankan seluruh service sekaligus:

```bash
pnpm dev
```

Service development tersedia di:

| Service | URL |
| --- | --- |
| Web dashboard | `http://localhost:3000` |
| Express API | `http://localhost:3001` |
| FastAPI AI worker | `http://localhost:8000` |
| AI worker documentation | `http://localhost:8000/docs` |

Periksa bahwa API dan AI worker sudah aktif:

```bash
curl http://localhost:3001/
curl http://localhost:8000/health
```

Setelah itu buka `http://localhost:3000`, register akun baru, lalu masuk ke
dashboard dan image editor.

### 6. Jalankan service secara terpisah

```bash
pnpm dev:web      # Next.js frontend
pnpm dev:api      # Express API
pnpm dev:ai       # FastAPI AI worker
```

### 7. Validasi instalasi

```bash
pnpm check
pnpm build
```

`pnpm check` menjalankan lint, typecheck, dan test seluruh workspace. Perintah
`pnpm build` menjalankan production build sesuai urutan dependency monorepo.

### Troubleshooting

#### `No module named uvicorn`

Virtual environment AI worker belum dibuat atau dependency Python belum
terinstal. Ulangi langkah 3 dan pastikan Python yang dipakai adalah versi 3.12.

#### `MongoDB connection error: ECONNREFUSED 127.0.0.1:27017`

API tidak sedang menerima connection string Atlas atau MongoDB lokal belum
berjalan. Pastikan variabelnya bernama `MONGODB_URI` di `apps/api/.env`, bukan di
root repository, kemudian restart API.

#### `querySrv ECONNREFUSED` atau koneksi Atlas timeout

Periksa koneksi internet, DNS, username/password, nama cluster, dan MongoDB
Atlas Network Access. Pastikan database user memiliki izin ke database yang
digunakan.

#### Perintah `pnpm` menggunakan versi Node yang salah

Aktifkan Node 22 pada terminal yang sama, lalu jalankan kembali `corepack enable`
dan `corepack prepare pnpm@11.4.0 --activate` sebelum instalasi.

#### Tesseract tidak ditemukan

Pastikan perintah `tesseract --version` berhasil dijalankan dari terminal,
kemudian restart AI worker.

## Monorepo Development

Internal dependency `@atlas/*` menggunakan protokol `workspace:*` dan dapat
disinkronkan dengan:

```bash
pnpm sync:monorepo
```

---

## Applications

| Application    | Description           |
| -------------- | --------------------- |
| apps/web       | Next.js frontend      |
| apps/api       | Backend API           |
| apps/ai-worker | AI processing service |

---

## Packages

| Package          | Responsibility          |
| ---------------- | ----------------------- |
| atlas-types      | Shared types            |
| atlas-document   | Project reader & writer |
| atlas-command    | Command system          |
| atlas-events     | Event system            |
| atlas-core       | Business logic          |
| atlas-plugin     | Plugin contracts         |
| atlas-translation | Translation workflows  |
| atlas-ui         | Shared UI components    |

---

## Documentation

All project documentation is located in the `docs` directory.

Documentation includes:

- Product Overview
- Architecture
- Atlas Document Specification
- API Specification
- Database Design
- Plugin System
- AI Architecture
- Development Guide

---

## Development Workflow

```text
Idea
  ↓
Specification
  ↓
Task
  ↓
Implementation
  ↓
Review
  ↓
Merge
  ↓
Release
```

---

## Technology Stack

### Frontend

- Next.js
- TypeScript
- Chakra UI
- Konva.js

### Backend

- Node.js
- Express

### AI Worker

- Python
- FastAPI
- PaddleOCR
- Gemini
- OpenAI
- Qwen

### Database

- MongoDB

---

## Project Status

Atlas Studio is currently under active development.

The architecture and documentation are being finalized before feature implementation begins.

Current focus:

- Foundation packages
- Documentation
- Development workflow
- Plugin architecture

---

## Contributing

Contribution guidelines will be published after the first public release.

Until then, development follows the internal engineering workflow documented in the `docs` directory.

---

## Roadmap

See:

- `docs/00-overview/ROADMAP.md`

---

## License

MIT License

---

## Maintainer

Developed by **H.Makki**

---

## Acknowledgements

Atlas Studio is inspired by the open-source community and modern software engineering practices.

Special thanks to the communities behind OCR, AI, computer vision, and localization technologies that make projects like this possible.

---

## Learn More

- `docs/README.md`
- `docs/01-architecture/`
- `docs/03-api/`
- `docs/05-ai/`
- `docs/06-plugin/`

---

**Atlas Studio — Building the next generation of AI-powered image translation.**
