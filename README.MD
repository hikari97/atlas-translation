---
title: Atlas Studio
description: AI-powered manga, comic, and image translation platform
version: 0.1.0
status: Development
owner: H.Makki
last_updated: 2026-07-01
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
atlas/

apps/
packages/
plugins/
docs/
schemas/
tasks/
tooling/

README.md
```

---

## Applications

| Application    | Description           |
| -------------- | --------------------- |
| apps/web       | Next.js frontend      |
| apps/api       | Backend API           |
| apps/ai-worker | AI processing service |
| apps/tools     | Internal tools        |

---

## Packages

| Package          | Responsibility          |
| ---------------- | ----------------------- |
| atlas-types      | Shared types            |
| atlas-document   | Project reader & writer |
| atlas-command    | Command system          |
| atlas-events     | Event system            |
| atlas-core       | Business logic          |
| atlas-plugin-sdk | Plugin API              |
| atlas-sdk        | Public SDK              |
| atlas-ui         | Shared UI components    |
| shared           | Utilities & helpers     |

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
