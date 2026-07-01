---
title: Non Goals
version: 1.0
status: Active
owner: H.Makki
last_updated: 2026-07-01
---

---

# Atlas Studio Non Goals

## Purpose

This document defines what Atlas Studio is **not** intended to become.

Clearly defining non-goals helps prevent feature creep, keeps development focused, and protects the project's long-term vision.

If a proposed feature appears below, it should not be implemented unless the project direction officially changes.

---

# Core Non Goals

Atlas Studio is **NOT** intended to become:

- A general-purpose image editor.
- A Photoshop replacement.
- A Figma replacement.
- A Canva replacement.
- A video editing application.
- A 3D graphics application.
- A desktop publishing application.

---

# AI Non Goals

Atlas Studio will NOT:

- Train large language models.
- Train OCR models.
- Train diffusion models.
- Replace AI providers.
- Build proprietary foundation models.

Atlas Studio integrates AI.

It does not develop AI models.

---

# Translation Non Goals

Atlas Studio will NOT:

- Replace professional translators.
- Guarantee perfect translations.
- Automatically localize every cultural reference.
- Remove the need for human review.

Human review remains part of the workflow.

---

# OCR Non Goals

Atlas Studio will NOT:

- Guarantee 100% OCR accuracy.
- Attempt to recognize every artistic font.
- Modify OCR engine internals.

OCR engines are replaceable plugins.

---

# Image Editing Non Goals

Atlas Studio will NOT become:

- A photo manipulation suite.
- A RAW image editor.
- A color grading application.
- A vector illustration editor.

Image editing exists only to support translation workflows.

---

# Rendering Non Goals

Atlas Studio is not intended to become a full publishing layout application.

Rendering focuses on translated comic pages only.

---

# Plugin Non Goals

Plugins should NOT:

- Modify Atlas Core directly.
- Replace internal architecture.
- Access private APIs.
- Modify unrelated plugins.

Plugins extend the platform.

They do not redefine it.

---

# API Non Goals

The backend API will NOT:

- Become a generic CMS.
- Become a general file server.
- Replace cloud storage providers.

---

# UI Non Goals

The UI should NOT:

- Contain business logic.
- Duplicate package functionality.
- Depend directly on AI providers.

---

# Architecture Non Goals

Atlas Studio will NOT:

- Introduce circular dependencies.
- Mix UI with domain logic.
- Depend on a single AI provider.
- Depend on a single OCR engine.
- Depend on a specific cloud platform.

---

# Documentation Non Goals

Documentation should NOT:

- Duplicate code.
- Replace code comments.
- Become outdated.
- Contain undocumented assumptions.

---

# Engineering Non Goals

The project will NOT:

- Sacrifice maintainability for speed.
- Introduce unnecessary complexity.
- Over-engineer small features.
- Optimize prematurely.
- Ignore documentation.

---

# Product Vision Protection

Whenever a proposed feature is requested, ask the following questions:

1. Does it improve comic or manga translation?
2. Does it support the existing workflow?
3. Does it align with the project vision?
4. Does it increase unnecessary complexity?
5. Can it be implemented as a plugin?

If the answer to these questions is mostly "No", the feature should be rejected or postponed.

---

# Future Expansion

Features may be reconsidered in future versions if they support the core mission of Atlas Studio.

However, expanding the project's scope should never compromise simplicity, maintainability, or architectural consistency.

---

# Related Documents

- README.md
- CONSTITUTION.md
- DECISIONS.md
- docs/00-overview/
- docs/01-architecture/

---

The strength of Atlas Studio comes from maintaining a clear focus.

Every new feature should reinforce the platform's mission rather than expand it beyond its intended purpose.
