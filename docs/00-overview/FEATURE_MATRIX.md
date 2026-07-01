---
title: Feature Matrix
version: 1.0
status: Active
owner: H.Makki
last_updated: 2026-07-01
---

---

# Atlas Studio Feature Matrix

## Purpose

This document defines the implementation roadmap for every major feature in Atlas Studio.

It answers three important questions:

1. Is this feature part of the MVP?
2. Which release introduces it?
3. Is the feature provided by the core application or a plugin?

The Feature Matrix is the primary planning document used before creating tasks or writing code.

---

# Release Plan

| Version | Goal                                        |
| ------- | ------------------------------------------- |
| MVP     | Build a usable offline translation workflow |
| v1.0    | Stable public release                       |
| v1.5    | Professional workflow improvements          |
| v2.0    | Collaboration & Marketplace                 |

---

# Workspace

| Feature            | MVP | v1.0 | v1.5 | v2.0 |
| ------------------ | :-: | :--: | :--: | :--: |
| Workspace          | ✅  |  ✅  |  ✅  |  ✅  |
| Multiple Projects  | ✅  |  ✅  |  ✅  |  ✅  |
| Recent Projects    | ✅  |  ✅  |  ✅  |  ✅  |
| Workspace Settings | ✅  |  ✅  |  ✅  |  ✅  |
| Cloud Workspace    | ❌  |  ❌  |  ❌  |  ✅  |

---

# Project

| Feature           | MVP | v1.0 | v1.5 | v2.0 |
| ----------------- | :-: | :--: | :--: | :--: |
| Create Project    | ✅  |  ✅  |  ✅  |  ✅  |
| Project Metadata  | ✅  |  ✅  |  ✅  |  ✅  |
| Autosave          | ✅  |  ✅  |  ✅  |  ✅  |
| Version History   | ❌  |  ✅  |  ✅  |  ✅  |
| Project Templates | ❌  |  ❌  |  ✅  |  ✅  |

---

# Page

| Feature       | MVP | v1.0 | v1.5 | v2.0 |
| ------------- | :-: | :--: | :--: | :--: |
| Import Images | ✅  |  ✅  |  ✅  |  ✅  |
| Reorder Pages | ✅  |  ✅  |  ✅  |  ✅  |
| Crop          | ✅  |  ✅  |  ✅  |  ✅  |
| Rotate        | ✅  |  ✅  |  ✅  |  ✅  |
| Batch Import  | ❌  |  ✅  |  ✅  |  ✅  |

---

# OCR

| Feature                | MVP | v1.0 | v1.5 | v2.0 |
| ---------------------- | :-: | :--: | :--: | :--: |
| OCR                    | ✅  |  ✅  |  ✅  |  ✅  |
| Manual OCR             | ✅  |  ✅  |  ✅  |  ✅  |
| OCR Correction         | ✅  |  ✅  |  ✅  |  ✅  |
| Multiple OCR Providers | ❌  |  ✅  |  ✅  |  ✅  |

---

# Bubble Detection

| Feature          | MVP | v1.0 | v1.5 | v2.0 |
| ---------------- | :-: | :--: | :--: | :--: |
| Bubble Detection | ✅  |  ✅  |  ✅  |  ✅  |
| Manual Selection | ✅  |  ✅  |  ✅  |  ✅  |
| Bubble Only Mode | ✅  |  ✅  |  ✅  |  ✅  |
| Redetect Bubble  | ✅  |  ✅  |  ✅  |  ✅  |

---

# Translation

| Feature              | MVP | v1.0 | v1.5 | v2.0 |
| -------------------- | :-: | :--: | :--: | :--: |
| AI Translation       | ✅  |  ✅  |  ✅  |  ✅  |
| Manual Translation   | ✅  |  ✅  |  ✅  |  ✅  |
| Prompt Templates     | ✅  |  ✅  |  ✅  |  ✅  |
| Custom Prompt        | ✅  |  ✅  |  ✅  |  ✅  |
| Translation Memory   | ❌  |  ✅  |  ✅  |  ✅  |
| Character Dictionary | ❌  |  ✅  |  ✅  |  ✅  |
| Glossary             | ❌  |  ✅  |  ✅  |  ✅  |

---

# Editor

| Feature        | MVP | v1.0 | v1.5 | v2.0 |
| -------------- | :-: | :--: | :--: | :--: |
| Font Family    | ✅  |  ✅  |  ✅  |  ✅  |
| Font Size      | ✅  |  ✅  |  ✅  |  ✅  |
| Font Color     | ✅  |  ✅  |  ✅  |  ✅  |
| Stroke         | ✅  |  ✅  |  ✅  |  ✅  |
| Shadow         | ✅  |  ✅  |  ✅  |  ✅  |
| Text Alignment | ✅  |  ✅  |  ✅  |  ✅  |
| Rotation       | ✅  |  ✅  |  ✅  |  ✅  |
| Letter Spacing | ❌  |  ✅  |  ✅  |  ✅  |
| Line Height    | ❌  |  ✅  |  ✅  |  ✅  |

---

# Image Editing

| Feature                 | MVP | v1.0 | v1.5 | v2.0 |
| ----------------------- | :-: | :--: | :--: | :--: |
| Brush                   | ✅  |  ✅  |  ✅  |  ✅  |
| Eraser                  | ✅  |  ✅  |  ✅  |  ✅  |
| Erase Text & Background | ✅  |  ✅  |  ✅  |  ✅  |
| Restore Original Pixels | ✅  |  ✅  |  ✅  |  ✅  |
| Crop                    | ✅  |  ✅  |  ✅  |  ✅  |
| Zoom                    | ✅  |  ✅  |  ✅  |  ✅  |
| Inpainting              | ❌  |  ✅  |  ✅  |  ✅  |

---

# AI Review

| Feature           | MVP | v1.0 | v1.5 | v2.0 |
| ----------------- | :-: | :--: | :--: | :--: |
| AI Review         | ❌  |  ✅  |  ✅  |  ✅  |
| Vision QA         | ❌  |  ✅  |  ✅  |  ✅  |
| Layout Validation | ❌  |  ❌  |  ✅  |  ✅  |

---

# Export

| Feature       | MVP | v1.0 | v1.5 | v2.0 |
| ------------- | :-: | :--: | :--: | :--: |
| PNG           | ✅  |  ✅  |  ✅  |  ✅  |
| JPG           | ✅  |  ✅  |  ✅  |  ✅  |
| WEBP          | ✅  |  ✅  |  ✅  |  ✅  |
| PDF           | ❌  |  ✅  |  ✅  |  ✅  |
| CBZ           | ❌  |  ✅  |  ✅  |  ✅  |
| Atlas Project | ✅  |  ✅  |  ✅  |  ✅  |

---

# Plugin System

| Feature             | MVP | v1.0 | v1.5 | v2.0 |
| ------------------- | :-: | :--: | :--: | :--: |
| Plugin Loader       | ❌  |  ✅  |  ✅  |  ✅  |
| Translation Plugins | ❌  |  ✅  |  ✅  |  ✅  |
| OCR Plugins         | ❌  |  ✅  |  ✅  |  ✅  |
| Storage Plugins     | ❌  |  ❌  |  ✅  |  ✅  |
| Marketplace         | ❌  |  ❌  |  ❌  |  ✅  |

---

# Release Criteria

## MVP

The MVP is complete when a user can:

- Create a workspace
- Create a project
- Import pages
- Detect bubbles
- Run OCR
- Translate text
- Edit typography
- Remove original text
- Restore erased areas
- Export translated pages

without requiring external image editing software.

---

# Change Management

When a new feature is proposed:

1. Add it to this matrix.
2. Assign it to a release.
3. Create or update the related specification.
4. Create implementation tasks.
5. Begin development.

Never implement a feature that is not listed in this document.

---

# Related Documents

- PRODUCT.md
- ROADMAP.md
- CONSTITUTION.md
- DECISIONS.md
- NON_GOALS.md
- tasks/

---

This Feature Matrix serves as the planning bridge between the product vision and the engineering implementation.
