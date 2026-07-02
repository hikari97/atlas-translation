# Architecture Rules

## EPIC-014 — atlas-translation

---

# Rule 1

TranslationItem adalah Aggregate Root.

Semua operasi Translation Engine harus dimulai dari TranslationItem.

Contoh:

✓ Progress

✓ Retry

✓ Pause

✓ Resume

✓ Diagnostics

✓ Pipeline

✓ Result

Tidak boleh ada operasi yang langsung memproses Provider.

---

# Rule 2

Pipeline hanya mengetahui PipelineStage.

Pipeline tidak boleh mengetahui:

- OpenAI
- Gemini
- Claude
- EasyOCR
- PaddleOCR

Pipeline hanya mengetahui kontrak PipelineStage.

---

# Rule 3

Workflow tidak menjalankan OCR.

Workflow hanya mengatur TranslationItem.

Pipeline yang menjalankan OCR.

---

# Rule 4

Scheduler tidak mengetahui AI Provider.

Scheduler hanya mengetahui TranslationItem.

---

# Rule 5

Provider tidak mengetahui Pipeline.

Provider hanya menerima Request.

Provider hanya mengembalikan Result.

---

# Rule 6

Translation Memory tidak memanggil Provider.

Urutan:

Translation Request

↓

Translation Memory

↓

Hit ?

↓

YES

↓

Return

↓

NO

↓

Provider

---

# Rule 7

Glossary tidak menerjemahkan.

Glossary hanya memperkaya Context.

---

# Rule 8

Style Guide tidak mengubah Pipeline.

Style Guide hanya memengaruhi Prompt.

---

# Rule 9

Semua State immutable.

Progress.

Result.

Snapshot.

Diagnostics.

Recovery.

Semua menggunakan Snapshot.

---

# Rule 10

Semua Provider adalah Plugin.

Engine tidak memiliki Provider bawaan.

---

# Rule 11

Batch hanya mengetahui TranslationItem.

Batch tidak mengetahui:

PNG

JPG

WEBP

PDF

Clipboard

---

# Rule 12

Semua komunikasi menggunakan Event.

Tidak boleh ada dependency langsung antar package.

---

# Rule 13

Retry hanya mengulang Stage yang gagal.

Tidak mengulang seluruh Pipeline.

---

# Rule 14

Progress tersedia pada setiap level.

Session

↓

Batch

↓

Item

↓

Pipeline

↓

Stage

---

# Rule 15

Engine harus berjalan tanpa UI.

Semua fitur harus dapat dijalankan melalui API publik.
