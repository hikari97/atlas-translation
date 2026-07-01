---
title: AI Coding Assistant Guide
description: Development rules for AI coding assistants working on Atlas Studio
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# AI Coding Assistant Guide

## Overview

The `.codex` directory contains instructions, standards, and contextual information used by AI coding assistants while contributing to Atlas Studio.

The purpose of this directory is to ensure that every AI-generated implementation follows the same engineering standards, architecture, and development workflow.

This directory should be considered mandatory reading before implementing any feature.

---

# Goals

The AI documentation exists to:

- Maintain architectural consistency
- Prevent unintended changes
- Improve implementation quality
- Reduce prompt size
- Standardize AI-assisted development

---

# Directory Structure

```text
.codex/

README.md

SYSTEM_PROMPT.md
CONTEXT.md
RULES.md
CHECKLIST.md
ARCHITECTURE.md
TASK_TEMPLATE.md
REVIEW_TEMPLATE.md
```

Additional documents may be added as the project evolves.

---

# Required Reading Order

Before implementing any task, AI assistants should read the following documents in order.

1. README.md
2. docs/README.md
3. AGENTS.md
4. CONSTITUTION.md
5. CONTEXT.md
6. .codex/README.md
7. Relevant architecture documents
8. Current task document

Do not skip this process.

---

# AI Responsibilities

AI assistants should:

- Follow project architecture.
- Respect package boundaries.
- Follow dependency rules.
- Produce maintainable code.
- Update documentation when necessary.
- Keep implementations small and focused.

---

# AI Restrictions

AI assistants must NOT:

- Modify unrelated files.
- Introduce circular dependencies.
- Rewrite completed architecture.
- Rename packages without approval.
- Delete existing functionality unless requested.
- Change project structure without a documented task.

---

# Engineering Rules

Always:

- Use TypeScript strict mode.
- Prefer composition over inheritance.
- Keep functions small.
- Keep modules cohesive.
- Write self-documenting code.
- Respect naming conventions.

Never:

- Duplicate business logic.
- Mix UI and domain logic.
- Bypass public APIs.
- Hardcode configuration values.

---

# Package Dependency Rules

Applications may depend on packages.

Packages may depend on lower-level packages.

Packages must never depend on applications.

Example:

```text
apps
    │
    ▼
atlas-core
    │
    ▼
atlas-document
    │
    ▼
atlas-types
```

Reverse dependencies are forbidden.

---

# Task Workflow

Every implementation begins with a task.

Workflow:

```text
Task
    ↓
Read Documentation
    ↓
Implementation
    ↓
Self Review
    ↓
Testing
    ↓
Ready for Review
```

Never implement features without a task.

---

# File Modification Rules

Before modifying a file, verify that it is listed under **Files Allowed** in the task specification.

If a required modification falls outside the allowed files, stop and request clarification.

---

# Documentation Rules

Whenever code behavior changes:

- Update related documentation.
- Update examples.
- Update API references if necessary.

Documentation is part of the implementation.

---

# Error Handling

AI assistants should:

- Return meaningful errors.
- Avoid silent failures.
- Prefer explicit validation.
- Handle edge cases gracefully.

---

# Testing

Before completing a task, verify:

- Project builds successfully.
- TypeScript passes.
- Lint passes.
- Unit tests pass (if applicable).
- No unrelated files were modified.

---

# Code Style

Prefer:

- Clear naming
- Small functions
- Immutable data where practical
- Explicit return types for exported APIs
- Consistent formatting

Avoid:

- Deep nesting
- Large classes
- Hidden side effects
- Global mutable state

---

# Architecture Principles

Atlas Studio follows these principles:

- Domain-driven packages
- Plugin-first architecture
- Non-destructive editing
- Event-driven communication
- Command-based editing
- Shared type definitions

Do not introduce architectural patterns that conflict with these principles.

---

# AI Context

Atlas Studio is developed using AI-assisted engineering.

AI assistants are expected to:

- Follow documented specifications.
- Avoid making assumptions.
- Ask for clarification when requirements are incomplete.
- Prioritize correctness over speed.

The architecture documentation is the source of truth.

---

# Definition of Success

A successful AI implementation should:

- Solve only the requested problem.
- Respect project architecture.
- Pass validation and review.
- Produce maintainable code.
- Leave the project in a better state than before.

---

# Related Documents

- ../README.md
- ../docs/README.md
- ../tasks/README.md
- ../AGENTS.md
- ../CONSTITUTION.md
- ../CONTEXT.md

---

Atlas Studio treats AI coding assistants as engineering collaborators.

Following these guidelines ensures consistent, maintainable, and production-ready implementations across the entire project.
