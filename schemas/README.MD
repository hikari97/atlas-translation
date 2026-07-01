---
title: Schemas
description: Atlas Studio JSON Schema Specification
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# Schemas

## Overview

The `schemas` directory contains the official JSON Schema definitions used throughout Atlas Studio.

Schemas define the structure, validation rules, and compatibility requirements for Atlas project files and configuration files.

Every application within the Atlas ecosystem must validate data against these schemas before reading or writing project files.

Schemas serve as the **contract between applications**.

---

# Goals

The schema system exists to:

- Standardize project files
- Validate user data
- Prevent invalid projects
- Support version migration
- Ensure compatibility
- Enable automatic code generation

---

# Directory Structure

```text
schemas/

README.md

manifest.schema.json
workspace.schema.json
project.schema.json
page.schema.json
bubble.schema.json
layer.schema.json
translation.schema.json
style.schema.json
workflow.schema.json
plugin.schema.json
settings.schema.json
```

Additional schemas may be introduced as the project evolves.

---

# Design Principles

Every schema should follow these principles:

- Human Readable
- Strict Validation
- Backward Compatible
- Versioned
- Extensible
- Self-Contained

---

# Schema Responsibilities

## manifest.schema.json

Defines project metadata.

Responsible for:

- Format Version
- Schema Version
- Minimum Supported Version
- Project Type

---

## workspace.schema.json

Defines the Workspace.

Responsible for:

- Workspace Information
- Shared Resources
- Settings
- Recent Projects

---

## project.schema.json

Defines an Atlas Project.

Responsible for:

- Project Metadata
- Pages
- Assets
- Language Settings

---

## page.schema.json

Defines a page inside a project.

Responsible for:

- Image Size
- Layers
- Bubble Collection
- Rotation
- Metadata

---

## bubble.schema.json

Defines a text bubble.

Responsible for:

- Polygon
- Bounding Box
- OCR Result
- Translation
- Style
- Reading Order

---

## layer.schema.json

Defines editor layers.

Responsible for:

- Layer Type
- Visibility
- Opacity
- Objects

---

## translation.schema.json

Defines translated content.

Responsible for:

- Source Text
- Target Text
- Translation Engine
- Status
- Review Information

---

## style.schema.json

Defines text rendering.

Responsible for:

- Font Family
- Font Size
- Font Weight
- Color
- Stroke
- Shadow
- Alignment

---

## workflow.schema.json

Defines workflow automation.

Responsible for:

- Workflow Steps
- Conditions
- Actions
- Plugin Integration

---

## plugin.schema.json

Defines plugin metadata.

Responsible for:

- Plugin ID
- Version
- Capabilities
- Dependencies
- Configuration

---

## settings.schema.json

Defines workspace and application settings.

Responsible for:

- User Preferences
- Default Language
- Theme
- AI Settings
- Rendering Preferences

---

# Validation Flow

```text
Read File
    ↓
Load Schema
    ↓
Validate
    ↓
Valid?
   ├── Yes → Continue
   └── No → Return Validation Errors
```

No Atlas project should be opened unless validation succeeds.

---

# Versioning

Every schema must include a version identifier.

Example:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "version": "1.0.0"
}
```

Breaking changes require a new schema version.

---

# Migration

Schema evolution should follow these rules:

- Never silently discard data.
- Prefer adding new fields over removing existing ones.
- Provide migration scripts for breaking changes.
- Preserve backward compatibility whenever possible.

---

# Code Generation

Schemas may be used to generate:

- TypeScript Types
- Validation Logic
- API Models
- Documentation
- SDK Models

Schema files should always be considered the source of truth.

---

# Naming Convention

Schema filenames should use lowercase and kebab-case.

Examples:

```text
project.schema.json
bubble.schema.json
translation.schema.json
```

---

# Testing

Each schema should include validation tests.

Tests should verify:

- Valid examples
- Invalid examples
- Required fields
- Optional fields
- Version compatibility

---

# AI Context

AI coding assistants should never modify schema files without updating:

- Documentation
- Types
- Validation
- Migration logic

When introducing new data fields:

1. Update the schema.
2. Update related TypeScript types.
3. Update validation logic.
4. Update migration logic.
5. Update documentation.

---

# Related Documents

- ../README.md
- ../docs/specification/
- ../docs/01-architecture/ATLAS_DOCUMENT.md
- ../packages/atlas-document/README.md

---

# Future Work

Future enhancements include:

- Automatic TypeScript generation
- Automatic Zod schema generation
- OpenAPI model generation
- Schema visualization
- Compatibility checker

---

Schemas are the foundation of data integrity in Atlas Studio.

Every application, plugin, and service should rely on these schemas to ensure consistency, compatibility, and long-term maintainability.
