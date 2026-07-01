# ATLAS_DOCUMENT.md

# Atlas Document Specification

**Version:** 1.0.0
**Status:** Stable
**Last Updated:** 2026-07-01

---

# 1. Purpose

Atlas Document adalah format project resmi Atlas Studio.

Seluruh komponen Atlas Studio wajib menggunakan Atlas Document sebagai **Single Source of Truth**.

Komponen tersebut meliputi:

- Atlas Studio (Editor)
- Atlas API
- Atlas AI Worker
- Plugin System
- Export Engine
- Import Engine
- Cloud Sync
- Desktop App
- CLI

Canvas, database, dan cache **bukan** sumber data utama.

---

# 2. Design Goals

Atlas Document harus memenuhi tujuan berikut:

- Human Readable
- JSON Based
- Extensible
- Versioned
- Plugin Friendly
- Offline First
- Cloud Ready
- Git Friendly
- Non Destructive
- Easy Migration

---

# 3. Project Format

Working Project

```
Project.atlas/
```

Compressed Project

```
Project.atlasz
```

Asset Package

```
Project.atlaspack
```

---

# 4. Project Structure

```
Project.atlas/

manifest.json
project.json

pages/
assets/
glossary/
characters/
workflow/
plugins/
metadata/

.history/
cache/
exports/
temp/
```

---

# 5. Directory Description

## manifest.json

Informasi dasar project.

Tidak boleh berisi data editor.

---

## project.json

Konfigurasi utama project.

---

## pages/

Berisi seluruh halaman.

Setiap halaman berdiri sendiri.

---

## assets/

Berisi resource project.

Contoh:

- Font
- Brush
- Texture
- Icon

---

## glossary/

Translation Memory dan Glossary.

---

## characters/

Database karakter.

---

## workflow/

Workflow project.

---

## plugins/

Data milik plugin.

Core tidak boleh membaca isi plugin.

---

## metadata/

Thumbnail, preview dan metadata lain.

---

## .history/

Semua command editor.

---

## cache/

Cache lokal.

Tidak ikut export.

---

## exports/

Hasil export.

---

## temp/

Temporary files.

---

# 6. Manifest

Contoh

```json
{
  "format": "atlas",
  "version": "1.0.0",
  "schema": "1.0.0",
  "createdWith": "Atlas Studio 1.0",
  "minimumVersion": "1.0.0",
  "compression": false
}
```

Manifest hanya berisi informasi project.

---

# 7. Project

Contoh

```json
{
  "id": "project_001",
  "name": "Solo Leveling Chapter 1",
  "description": "",
  "author": "",
  "sourceLanguage": "ja",
  "targetLanguage": "id",
  "createdAt": "",
  "updatedAt": "",
  "pageCount": 20
}
```

---

# 8. Page Structure

```
pages/

page-001/

page.json
original.png
render.png
thumbnail.webp

page-002/

page.json
original.png
render.png
thumbnail.webp
```

Setiap page harus independen.

---

# 9. Page Object

Contoh

```json
{
  "id": "page_001",
  "index": 1,
  "width": 1200,
  "height": 1800,
  "rotation": 0,
  "layers": [],
  "bubbles": []
}
```

---

# 10. Layer

Jenis layer:

- Original
- Translation
- Inpaint
- Drawing
- Guide

Field:

- id
- name
- type
- visible
- locked
- opacity
- objects

---

# 11. Bubble

Bubble adalah unit utama editor.

Contoh

```json
{
  "id": "bubble_001",
  "type": "dialogue",
  "polygon": [],
  "bbox": {},
  "rotation": 0,
  "confidence": 0.98,
  "readingOrder": 1,
  "locked": false,
  "hidden": false,
  "ocr": {},
  "translation": {},
  "style": {}
}
```

Bubble tidak menyimpan gambar.

Bubble hanya menyimpan data.

---

# 12. OCR

Contoh

```json
{
  "text": "",
  "language": "ja",
  "confidence": 0.99,
  "engine": "paddleocr",
  "detectedAt": ""
}
```

---

# 13. Translation

Contoh

```json
{
  "source": "",
  "target": "",
  "engine": "gemini",
  "model": "",
  "prompt": "",
  "reviewed": false,
  "translatedAt": ""
}
```

---

# 14. Text Style

Contoh

```json
{
  "fontFamily": "Wild Words",
  "fontSize": 28,
  "fontWeight": 700,
  "italic": false,
  "underline": false,
  "color": "#000000",
  "outlineColor": "#FFFFFF",
  "outlineWidth": 2,
  "shadow": true,
  "shadowBlur": 4,
  "shadowOffsetX": 1,
  "shadowOffsetY": 1,
  "alignment": "center",
  "verticalAlignment": "middle",
  "lineHeight": 1.2,
  "letterSpacing": 0,
  "rotation": 0,
  "opacity": 1
}
```

---

# 15. Translation Scope

Setiap bubble memiliki kategori.

Nilai yang diperbolehkan:

- dialogue
- narration
- thought
- title
- sfx
- note
- watermark
- unknown

Kategori digunakan untuk:

- Bubble Only
- SFX Policy
- Prompt Builder
- AI Workflow

---

# 16. History

History menggunakan Command Pattern.

Contoh struktur command

```json
{
  "command": "TranslateBubble",
  "target": "bubble_001",
  "timestamp": "",
  "payload": {}
}
```

History disimpan sebagai event.

Bukan snapshot gambar.

---

# 17. Plugin Data

Plugin bebas menyimpan data.

Contoh

```json
{
  "plugin": "gemini",
  "data": {}
}
```

Core tidak boleh membaca data internal plugin.

Core hanya menyimpan.

---

# 18. Metadata

Metadata berisi:

- Thumbnail
- Preview
- Tags
- Created With
- Version
- Statistics

---

# 19. Assets

Assets dapat berisi:

- Font
- Brush
- Texture
- Icon
- Pattern

Project dapat membawa asset sendiri.

---

# 20. Cache

Cache hanya digunakan editor.

Isi cache dapat dihapus kapan saja.

Cache tidak boleh memengaruhi project.

---

# 21. Export

Format export:

- PNG
- WEBP
- JPG
- PDF
- ZIP
- CBZ
- ATLAS

Export selalu membaca Atlas Document.

---

# 22. Serialization

Encoding:

- UTF-8

Format:

- JSON

Compression:

- ZIP

---

# 23. Validation Rules

Setiap project wajib:

- memiliki manifest.json
- memiliki project.json
- memiliki minimal satu page
- lolos JSON Schema Validation

Jika validasi gagal maka project tidak boleh dibuka.

---

# 24. Migration

Semua perubahan schema wajib memiliki migration.

Migration tidak boleh menghapus data.

Migration harus bersifat deterministic.

---

# 25. Compatibility

Core harus:

- mengabaikan field yang tidak dikenal
- mempertahankan data plugin
- mendukung project versi lama selama migration tersedia

Plugin harus:

- tidak mengubah struktur inti project
- hanya menyimpan data pada direktori plugin

---

# 26. Offline First

Atlas Studio harus dapat:

- membuka project tanpa internet
- mengedit project tanpa internet
- menyimpan project tanpa internet

Cloud hanya berfungsi sebagai sinkronisasi.

---

# 27. Security

Atlas Document tidak boleh menyimpan:

- Access Token
- API Key
- Password
- Session
- Credential

Informasi sensitif hanya disimpan pada konfigurasi aplikasi, bukan di dalam project.

---

# 28. Naming Convention

Project

```
project_<uuid-v7>
```

Page

```
page_<uuid-v7>
```

Bubble

```
bubble_<uuid-v7>
```

Layer

```
layer_<uuid-v7>
```

Plugin

```
plugin_<uuid-v7>
```

Workflow

```
workflow_<uuid-v7>
```

---

# 29. Design Principles

Atlas Document harus selalu memenuhi prinsip berikut:

- Single Source of Truth
- Everything Editable
- Non Destructive Editing
- Plugin First
- Offline First
- JSON Based
- Human Readable
- Extensible
- Versioned
- Git Friendly

---

# 30. Core Rules

1. Atlas Document adalah satu-satunya sumber data resmi.
2. Canvas hanya berfungsi sebagai renderer.
3. Semua perubahan editor harus melalui Command Pattern.
4. Semua perubahan menghasilkan History.
5. Semua plugin membaca dan menulis Atlas Document melalui API resmi.
6. Semua export berasal dari Atlas Document.
7. Semua import harus menghasilkan Atlas Document yang valid.
8. Tidak ada komponen yang boleh memodifikasi file project secara langsung tanpa melalui Document API.
9. Semua project harus lolos validasi schema sebelum diproses.
10. Backward compatibility harus dipertahankan selama memungkinkan.

---

# 31. Future Compatibility

Spesifikasi ini dirancang agar dapat digunakan oleh:

- Atlas Studio (Web)
- Atlas Studio (Desktop)
- Atlas Cloud
- Atlas CLI
- Atlas SDK
- Atlas AI Worker
- Plugin Marketplace

Seluruh implementasi masa depan harus tetap mengikuti spesifikasi Atlas Document sebagai kontrak data utama.
