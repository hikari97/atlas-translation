---
title: Atlas Studio Engineering Constitution
version: 1.0
status: Active
owner: H.Makki
last_updated: 2026-07-01
---

---

# Atlas Studio Engineering Constitution

## Purpose

This document defines the non-negotiable engineering principles for Atlas Studio.

Every contributor, whether human or AI, must follow these rules.

If any implementation conflicts with this document, this document takes precedence.

---

# Core Principles

Atlas Studio is built on the following principles:

- Simplicity
- Maintainability
- Scalability
- Type Safety
- Plugin First
- Non-Destructive Editing
- AI Assisted Development

Every engineering decision should support these principles.

---

# Source of Truth

The following documents are authoritative.

Priority (highest to lowest):

1. CONSTITUTION.md
2. ATLAS_DOCUMENT.md
3. Architecture Documents
4. Task Specification
5. Code

Code must never contradict documentation.

---

# Architecture

The project architecture is considered stable.

Do not redesign the architecture unless explicitly requested.

Do not move folders or packages without an approved architecture decision.

---

# Package Rules

Packages are the foundation of Atlas Studio.

Rules:

- Packages must remain reusable.
- Packages must remain framework independent.
- Packages must expose a clear public API.
- Packages must not depend on applications.
- Circular dependencies are forbidden.

---

# Application Rules

Applications are orchestration layers.

Applications should:

- Use packages.
- Avoid business logic.
- Avoid code duplication.

Applications must not expose package internals.

---

# Plugin Rules

Every external AI provider should be implemented as a plugin whenever practical.

Examples:

- OCR
- Translation
- Vision
- Export
- Storage

Never hardcode provider-specific behavior inside the core application.

---

# Type Safety

TypeScript strict mode is mandatory.

Avoid:

- any
- implicit any
- unsafe casting

Shared types belong inside `atlas-types`.

---

# Business Logic

Business logic belongs inside packages.

Never place business logic inside:

- UI components
- Pages
- API routes
- Controllers

---

# Dependency Rules

Allowed direction:

```text
apps
    ↓
atlas-core
    ↓
atlas-document
    ↓
atlas-types
```

Forbidden:

- Circular dependencies
- Package → App imports
- Cross-package private imports

---

# Public API

Every package must expose a public API.

Applications must use only exported APIs.

Importing internal implementation files is forbidden.

Example:

✅

import { Workspace } from "@atlas/atlas-types";

❌

import { Workspace } from "@atlas/atlas-types/src/workspace/Workspace";

---

# Documentation

Documentation is part of the codebase.

Whenever behavior changes:

- Update documentation.
- Update examples.
- Update task status if required.

Documentation must not become outdated.

---

# Tasks

Every implementation must reference a task.

Do not implement undocumented features.

Do not extend task scope without approval.

---

# AI Development

AI coding assistants must:

- Read project documentation.
- Respect package boundaries.
- Respect task scope.
- Avoid assumptions.
- Ask for clarification when requirements are ambiguous.

AI assistants must never redesign the architecture.

---

# Code Quality

Every implementation should:

- Compile successfully.
- Pass linting.
- Be readable.
- Be maintainable.
- Be deterministic.

Code should optimize for long-term maintenance over short-term convenience.

---

# Error Handling

Always fail explicitly.

Avoid silent failures.

Provide meaningful error messages.

Validate external input.

---

# Testing

New functionality should be testable.

Business logic should be isolated from framework code whenever possible.

---

# Naming

Use consistent naming.

Examples:

Packages

- atlas-types
- atlas-document

Interfaces

- Workspace
- Project
- Bubble

Enums

- BubbleType
- ProjectStatus

Files

- PascalCase for exported types.
- kebab-case for folders where appropriate.

---

# Breaking Changes

Breaking changes require:

- Documentation update.
- Schema update (if applicable).
- Migration strategy.
- Architecture review.

---

# Security

Never:

- Hardcode secrets.
- Commit credentials.
- Disable validation.
- Trust external input without validation.

---

# Performance

Prefer:

- Simplicity
- Predictability
- Maintainability

Avoid premature optimization.

Optimize only after identifying bottlenecks.

---

# Definition of Done

A task is complete only when:

- Acceptance criteria are satisfied.
- Build succeeds.
- Documentation is updated.
- Code review is complete.
- No architectural rules are violated.

---

# Decision Making

When multiple solutions exist, choose the one that:

1. Preserves architecture.
2. Minimizes complexity.
3. Maximizes maintainability.
4. Reduces coupling.
5. Improves readability.

---

# Final Rule

Atlas Studio is designed as a long-term platform.

Every implementation should improve the project without compromising its architecture.

When in doubt, prioritize clarity, simplicity, and maintainability over cleverness.
