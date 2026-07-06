---
title: Applications
description: Atlas Studio Applications
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# Applications

## Overview

The `apps` directory contains all runnable applications that make up the Atlas Studio ecosystem.

Unlike reusable libraries stored in `packages`, every application inside this directory can be executed independently.

Applications are responsible for presenting user interfaces, exposing APIs, processing AI tasks, or providing development tools.

Business logic should remain inside `packages` whenever possible.

---

# Design Principles

Applications should follow these principles:

- Thin Application Layer
- Business Logic in Packages
- Independent Deployment
- Shared Domain Models
- Clear Responsibilities

Applications should orchestrate packages rather than reimplement business logic.

---

# Directory Structure

```text
apps/

web/
api/
ai-worker/
tools/
```

---

# Application Overview

## web

The primary user interface of Atlas Studio.

Technology:

- Next.js
- TypeScript
- Chakra UI
- Konva.js

Responsibilities:

- Workspace UI
- Project Management
- Canvas Editor
- Layer Panel
- Bubble Editor
- Translation Editor
- Settings
- Plugin Management

The web application should never contain business logic that belongs inside packages.

---

## api

Backend services for Atlas Studio.

Technology:

- Node.js
- Express
- TypeScript
- MongoDB

Responsibilities:

- Authentication
- Workspace API
- Project API
- File Upload
- Plugin Management
- User Management
- Cloud Synchronization
- Queue Management

The API acts as the communication layer between applications and persistent storage.

---

## ai-worker

Dedicated AI processing service.

Technology:

- Python
- FastAPI

Responsibilities:

- OCR
- Bubble Detection
- Bubble Classification
- Translation
- Vision QA
- Inpainting
- Rendering Assistance

The AI Worker should never directly modify Atlas projects without using the Atlas Document model.

## RUN ai-worker

cd apps/ai-worker
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

---

## tools

Internal utilities used during development.

Examples:

- Dataset Importer
- Migration Scripts
- Benchmark Tools
- Performance Testing
- OCR Evaluation
- Translation Evaluation

These tools are intended for development and maintenance only.

---

# Application Communication

```text
                User
                  │
                  ▼
           Atlas Studio Web
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
     Backend API        AI Worker
        │                   │
        └─────────┬─────────┘
                  ▼
             Atlas Packages
                  │
                  ▼
              Atlas Document
```

Applications communicate through well-defined interfaces and shared packages.

---

# Dependency Rules

Applications may depend on:

- packages/\*
- shared utilities
- external libraries

Applications must not depend on:

- another application
- internal implementation details of another app

Example:

✔ web → atlas-core

✔ api → atlas-document

✔ ai-worker → atlas-plugin-sdk

✘ web → api source code

✘ api → web components

---

# Shared Responsibilities

Every application should:

- Use Atlas Document as the data model.
- Use shared types from atlas-types.
- Respect package dependency rules.
- Keep UI separate from business logic.
- Avoid code duplication.

---

# Development Guidelines

Each application should include:

```text
README.md
package.json
src/
tests/
```

Recommended additional directories:

```text
config/
public/
scripts/
```

Application-specific documentation should live inside the application's own directory.

---

# Coding Standards

Applications should follow:

- TypeScript Strict Mode
- ESLint
- Prettier
- Consistent Naming
- Dependency Injection where appropriate
- Small, testable modules

---

# AI Context

AI coding assistants should treat each application as an entry point.

Rules:

- Never move business logic into applications.
- Prefer using packages instead of duplicating code.
- Respect dependency boundaries.
- Do not import application code into packages.

When implementing new features:

1. Check if the logic belongs in a package.
2. Keep applications focused on orchestration.
3. Use shared domain types.

---

# Future Applications

Potential future applications include:

```text
desktop/
mobile/
cli/
cloud-dashboard/
marketplace/
```

These applications should reuse existing packages whenever possible.

---

# Related Documents

- ../README.md
- ../packages/README.md
- ../docs/README.md
- ../docs/01-architecture/
- ../docs/07-development/

---

Applications are responsible for delivering Atlas Studio to users.

A clean separation between applications and packages ensures that the platform remains scalable, maintainable, and ready for future expansion.
