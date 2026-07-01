---
title: Packages
description: Atlas Studio Shared Packages
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# Packages

## Overview

The `packages` directory contains all reusable libraries that make up the core of Atlas Studio.

Unlike the applications inside the `apps` directory, packages are framework-independent and can be shared across multiple applications.

For example:

- Web Application
- Backend API
- AI Worker
- Future Desktop Application
- CLI Tools

The primary goal is to separate business logic from application-specific code.

---

# Philosophy

Packages should be:

- Reusable
- Framework Agnostic
- Type Safe
- Independent
- Well Tested
- Easy to Maintain

Applications consume packages.

Packages should never depend on applications.

---

# Directory Structure

```text
packages/

atlas-types/
atlas-document/
atlas-command/
atlas-events/
atlas-core/
atlas-plugin-sdk/
atlas-sdk/
atlas-ui/
shared/
```

---

# Package Responsibilities

## atlas-types

Defines all shared TypeScript types, interfaces, enums, and domain models.

Responsibilities:

- Workspace Types
- Project Types
- Page Types
- Bubble Types
- Translation Types
- Style Types
- Plugin Types

Dependency Rules:

- Must not depend on any Atlas package.
- Must not depend on React.
- Must not depend on Node.js APIs.

---

## atlas-document

Responsible for reading, validating, writing, and migrating Atlas project files.

Responsibilities:

- Document Reader
- Document Writer
- JSON Validation
- Serialization
- Deserialization
- Version Migration

This package is the only component allowed to interact directly with Atlas project files.

---

## atlas-command

Implements the Command Pattern used throughout the editor.

Responsibilities:

- Undo
- Redo
- Command History
- Command Execution

Examples:

- Move Bubble
- Resize Bubble
- Delete Bubble
- Translate Bubble

---

## atlas-events

Provides the event system used by Atlas Studio.

Responsibilities:

- Event Bus
- Event Registration
- Event Dispatching
- Event Subscription

Typical Events:

- Bubble Created
- Bubble Updated
- Translation Completed
- OCR Finished

---

## atlas-core

Contains the core business logic of Atlas Studio.

Responsibilities:

- Workspace
- Project
- Page
- Layer
- Bubble
- Workflow
- Rendering Coordination

This package contains no UI code.

---

## atlas-plugin-sdk

Defines the interfaces and APIs required to build Atlas plugins.

Responsibilities:

- Plugin Lifecycle
- Registration
- Configuration
- Communication
- Validation

Plugins should only interact with Atlas Studio through this SDK.

---

## atlas-sdk

Public SDK for external developers.

Responsibilities:

- Public APIs
- Helpers
- SDK Utilities
- Integration Support

This package allows third-party applications to interact with Atlas Studio.

---

## atlas-ui

Shared user interface components.

Responsibilities:

- Buttons
- Dialogs
- Forms
- Layout Components
- Icons
- Theme Utilities

UI components should remain presentation-focused and should not contain business logic.

---

## shared

General utilities shared across the project.

Examples:

- Constants
- Utility Functions
- Error Classes
- Helper Functions

Avoid placing business logic inside this package.

---

# Dependency Graph

```text
atlas-types
      │
      ▼
atlas-document
      │
      ▼
atlas-command
      │
      ▼
atlas-events
      │
      ▼
atlas-core
      │
      ├──────────────┐
      ▼              ▼
atlas-plugin-sdk   atlas-sdk
      │              │
      └──────┬───────┘
             ▼
          atlas-ui
```

Packages should always follow this dependency direction.

Reverse dependencies are not allowed.

---

# Dependency Rules

Every package must follow these rules.

Allowed:

- Depend on lower-level packages.
- Depend on `atlas-types`.
- Depend on `shared` when appropriate.

Forbidden:

- Circular dependencies.
- Importing code from `apps`.
- Direct communication between unrelated packages.

---

# Package Standards

Each package should contain:

```text
package/

README.md

package.json

tsconfig.json

src/

tests/
```

Optional:

```text
examples/

docs/
```

---

# Development Principles

Every package should follow:

- Single Responsibility Principle
- Dependency Inversion Principle
- Composition over Inheritance
- Explicit Public API
- Strong Type Safety

---

# Testing

Every package should be independently testable.

Packages should avoid hidden dependencies and should expose clear public APIs.

---

# AI Context

AI coding assistants should treat each package as an independent module.

When implementing a feature:

- Only modify files within the target package.
- Do not introduce circular dependencies.
- Do not bypass public APIs.
- Respect dependency rules.

If a package requires functionality from another package, use its exported public API instead of accessing internal files.

---

# Related Documents

- ../README.md
- ../docs/README.md
- ../docs/01-architecture/
- ../docs/specification/

---

# Future Packages

Potential future packages include:

- atlas-renderer
- atlas-storage
- atlas-cloud
- atlas-sync
- atlas-telemetry
- atlas-testing

These packages will be introduced only when necessary.

---

Packages form the foundation of Atlas Studio.

A stable package architecture ensures long-term maintainability, scalability, and a clean separation of concerns across the entire platform.
