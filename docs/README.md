---
title: Documentation
description: Atlas Studio Documentation Index
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# Atlas Studio Documentation

Welcome to the official documentation of Atlas Studio.

This directory contains all technical specifications, architectural decisions, engineering standards, API documentation, and development guides used throughout the project.

This documentation is considered the **single source of truth** for the Atlas Studio codebase.

---

# Documentation Structure

```text
docs/

00-overview/
01-architecture/
02-database/
03-api/
04-ui/
05-ai/
06-plugin/
07-development/
specification/
adr/
```

---

# Documentation Map

## 00 — Overview

High-level project documentation.

Contents include:

- Product Vision
- Product Goals
- Roadmap
- Workflow
- Project Overview

Recommended reading order:

1. PRODUCT.md
2. VISION.md
3. ROADMAP.md
4. WORKFLOW.md

---

## 01 — Architecture

System architecture and design.

Contents include:

- Architecture Overview
- Atlas Document
- Workspace
- Project
- Page
- Bubble
- Layer System
- Command System
- Event System

This section defines how Atlas Studio is built internally.

---

## 02 — Database

Database design.

Contents include:

- Collections
- Relationships
- Index Strategy
- Versioning
- Storage Design

---

## 03 — API

Backend API specification.

Contents include:

- REST API
- Authentication
- Error Codes
- Request Format
- Response Format
- WebSocket Events

---

## 04 — UI

Frontend design documentation.

Contents include:

- Design System
- Components
- Layout
- Navigation
- Editor
- Accessibility

---

## 05 — AI

Artificial Intelligence architecture.

Contents include:

- OCR
- Translation
- Bubble Detection
- Vision QA
- Prompt Engineering
- AI Workflow

---

## 06 — Plugin

Plugin architecture.

Contents include:

- Plugin SDK
- Plugin Lifecycle
- OCR Plugins
- Translation Plugins
- Storage Plugins
- Export Plugins

---

## 07 — Development

Engineering documentation.

Contents include:

- Coding Standards
- Git Workflow
- Branch Strategy
- Documentation Standards
- Testing Guide
- Release Process

---

## Specification

Official specifications used throughout Atlas Studio.

Examples:

- Atlas Document
- JSON Schema
- File Format
- Configuration Format

Specifications are implementation-independent and serve as contracts between applications.

---

## ADR

Architecture Decision Records.

Each significant architectural decision must be documented as an ADR.

Every ADR should include:

- Context
- Decision
- Alternatives
- Consequences

ADR files should never be modified after approval.

If requirements change, create a new ADR.

---

# Documentation Principles

All documentation should follow these principles:

- Single Source of Truth
- Version Controlled
- Human Readable
- AI Friendly
- Easy to Navigate
- Continuously Updated

---

# Reading Order

For new contributors, the recommended reading order is:

1. README.md (Project Root)
2. docs/README.md
3. docs/00-overview/
4. docs/01-architecture/
5. docs/specification/
6. docs/07-development/

After understanding these documents, contributors can begin implementing tasks.

---

# Documentation Rules

Every document should:

- Have a clear purpose.
- Be written in English.
- Avoid duplicated information.
- Link to related documents whenever appropriate.
- Be updated whenever behavior changes.

---

# AI Context

This directory is intended for both human developers and AI coding assistants.

Before implementing any feature, AI agents should read:

1. Project README
2. docs/README.md
3. Relevant architecture documents
4. Current task specification

AI agents should never make architectural assumptions that contradict the documentation.

---

# Related Documents

- ../README.md
- ../AGENTS.md
- ../CONTEXT.md
- ../CONSTITUTION.md

---

# Future Documentation

Future documentation will include:

- Performance Guide
- Security Guide
- Deployment Guide
- Cloud Architecture
- Marketplace Documentation
- SDK Documentation

---

Atlas Studio documentation is maintained as part of the source code and follows the same review process as production code.
