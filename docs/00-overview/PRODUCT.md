---
title: Atlas Studio Product Specification
version: 1.0
status: Draft
owner: H.Makki
last_updated: 2026-07-01
---

---

# Atlas Studio Product Specification

## Executive Summary

Atlas Studio is a professional AI-powered platform for translating manga, comics, webtoons, and illustrated content.

It combines OCR, translation, image restoration, text editing, quality review, and export into a single workflow-driven application.

Instead of switching between multiple tools, users can complete the entire localization process inside Atlas Studio.

The platform is designed for scalability through a plugin-first architecture, allowing different AI providers, OCR engines, rendering engines, and storage backends to be integrated without changing the core application.

---

# Vision

Build the most complete and extensible translation platform for visual storytelling.

Atlas Studio aims to become the industry standard for AI-assisted comic localization.

---

# Mission

Reduce the time required to translate illustrated content while keeping human translators in full control of the final result.

AI assists the workflow.

Humans make the final decisions.

---

# Problem Statement

Current comic translation workflows typically require multiple disconnected tools.

Example workflow today:

1. OCR using one application.
2. Translation using another application.
3. Image editing in Photoshop.
4. Font replacement manually.
5. Export using another tool.

Problems:

- Fragmented workflow
- Manual repetition
- Inconsistent typography
- Difficult project management
- Poor collaboration
- No translation memory
- No reusable AI workflow

Atlas Studio solves these problems with a unified platform.

---

# Target Users

Primary users:

- Manga scanlation teams
- Comic translators
- Webtoon localization teams
- Publishers
- Localization companies

Secondary users:

- Independent translators
- Hobby scanlators
- Researchers
- AI developers

---

# User Personas

## Independent Translator

Works alone and translates manga for personal or commercial use.

Needs:

- Fast OCR
- Accurate translation
- Easy editing
- Simple export

---

## Scanlation Team

Multiple members collaborate on one project.

Needs:

- Shared glossary
- Character database
- Version history
- Consistent typography

---

## Publisher

Professional localization workflow.

Needs:

- Quality assurance
- Batch processing
- Export standards
- Stable document format

---

# Core Workflow

```text
Create Workspace
        ↓
Create Project
        ↓
Import Pages
        ↓
Detect Text Bubbles
        ↓
OCR
        ↓
Translate
        ↓
AI Review
        ↓
Manual Editing
        ↓
Typography Adjustment
        ↓
Quality Check
        ↓
Export
```

---

# Core Features

## Workspace Management

- Multiple workspaces
- Shared assets
- Translation memory
- Character database
- Shared glossary

---

## Project Management

- Multiple projects
- Page organization
- Metadata
- Version history
- Autosave

---

## Page Management

- Import images
- Page ordering
- Rotation
- Cropping
- Metadata

---

## Bubble Detection

Detect speech bubbles automatically.

Capabilities:

- AI Detection
- Manual Detection
- Bubble Only Mode
- Redetection

---

## OCR

Extract text from images.

Requirements:

- Multiple OCR providers
- Vertical text support
- Horizontal text support
- Manual correction

---

## Translation

Support multiple translation providers.

Features:

- AI Translation
- Manual Translation
- Translation Memory
- Glossary
- Character Dictionary
- Prompt Templates

---

## Image Editing

Atlas Studio includes a non-destructive editor.

Supported operations:

- Brush
- Eraser
- Restore Original Pixels
- Inpainting
- Crop
- Zoom
- Rotate

---

## Text Editing

Professional typography controls.

Supported features:

- Font Family
- Font Size
- Font Weight
- Font Color
- Stroke
- Shadow
- Line Height
- Letter Spacing
- Alignment
- Rotation
- Vertical Text
- Curved Text (Future)

---

## AI Features

Supported AI capabilities:

- OCR
- Translation
- Bubble Detection
- Bubble Classification
- Vision QA
- Translation Review
- Prompt Templates

AI providers are interchangeable through plugins.

---

## Review Workflow

Every translation may pass through multiple review stages.

Suggested statuses:

- Draft
- Machine Translated
- Human Edited
- Reviewed
- Approved
- Exported

---

## Export

Supported formats:

- PNG
- JPG
- WEBP
- PDF
- CBZ
- ZIP
- Atlas Project

---

# Plugin System

Atlas Studio is provider-independent.

Everything below should be replaceable through plugins:

- OCR
- Translation
- Vision
- Inpainting
- Rendering
- Storage
- Export
- AI Review

---

# Atlas Document

Every project is stored using the Atlas Document format.

The document contains:

- Workspace
- Projects
- Pages
- Bubbles
- OCR Results
- Translations
- Styles
- History
- Assets

Atlas Document is the single source of truth.

---

# Non-Destructive Editing

Atlas Studio never permanently modifies imported images.

Every operation should be reversible.

Original image data must remain recoverable.

---

# AI Philosophy

AI assists users.

AI never replaces user decisions.

Users should always be able to:

- Edit
- Override
- Restore
- Review

every AI-generated result.

---

# Performance Goals

The application should:

- Open large projects efficiently.
- Handle hundreds of pages.
- Support thousands of text bubbles.
- Remain responsive during editing.

Long-running AI operations should execute asynchronously.

---

# Cross-Platform Goals

Atlas Studio is designed to support:

- Web
- Desktop
- Cloud

Future mobile support may focus on review workflows rather than full editing.

---

# Security Goals

The application should:

- Protect user data.
- Never expose API keys.
- Validate imported documents.
- Isolate plugins.
- Prevent unauthorized file access.

---

# Accessibility Goals

Atlas Studio should:

- Support keyboard shortcuts.
- Provide scalable UI.
- Support high-resolution displays.
- Remain usable without AI features.

---

# Success Metrics

The project is considered successful when users can:

- Translate a complete chapter without external editing software.
- Switch AI providers without changing the project.
- Recover original content at any time.
- Collaborate using a consistent document format.
- Export publication-ready pages.

---

# Future Vision

Future versions may include:

- Cloud synchronization
- Team collaboration
- Plugin marketplace
- AI-powered proofreading
- Batch translation pipelines
- Mobile review application

These features should build upon the existing architecture rather than replace it.

---

# Out of Scope

Atlas Studio is not intended to become:

- A general image editor
- A Photoshop replacement
- A video editor
- A vector illustration tool
- A machine learning training platform
- A general desktop publishing application

---

# Product Principles

Every new feature should satisfy the following principles:

1. Improve the translation workflow.
2. Preserve non-destructive editing.
3. Support plugin extensibility.
4. Keep humans in control.
5. Maintain long-term scalability.
6. Follow the documented architecture.

---

# Related Documents

- README.md
- CONSTITUTION.md
- DECISIONS.md
- NON_GOALS.md
- docs/01-architecture/
- docs/02-specifications/
- tasks/

---

Atlas Studio is not simply an OCR application or a translation tool.

It is a complete platform for AI-assisted visual content localization, designed to scale from individual creators to professional publishing teams while maintaining a consistent, extensible, and future-proof architecture.
