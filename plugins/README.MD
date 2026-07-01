---
title: Plugin System
description: Atlas Studio Plugin Architecture
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# Plugin System

## Overview

Atlas Studio is built around a **Plugin First Architecture**.

Every AI capability, processing engine, storage provider, and export format should be implemented as a plugin whenever possible.

The core application should remain lightweight and independent from third-party services.

This architecture allows Atlas Studio to evolve without modifying the core codebase.

---

# Goals

The Plugin System is designed to provide:

- Extensibility
- Isolation
- Reusability
- Easy Maintenance
- Third-party Integration
- Future Marketplace Support

---

# Plugin Categories

Atlas Studio supports multiple plugin categories.

## OCR

Responsible for text detection and text recognition.

Examples:

- PaddleOCR
- EasyOCR
- MangaOCR

---

## Translation

Responsible for language translation.

Examples:

- Gemini
- OpenAI
- DeepL
- Google Translate
- Azure Translator

---

## Bubble Detection

Detects speech bubbles before OCR.

Examples:

- YOLO
- SAM
- Florence
- Grounding DINO

---

## Inpainting

Removes original text.

Examples:

- LaMa
- SDXL Inpaint
- BrushNet

---

## Rendering

Controls text rendering.

Examples:

- Manga Renderer
- Comic Renderer
- Publisher Renderer

---

## Vision QA

Reviews translated pages.

Examples:

- Gemini Vision
- GPT Vision
- Qwen Vision

---

## Storage

Stores projects or exported files.

Examples:

- Local Storage
- Amazon S3
- Cloudflare R2
- MinIO

---

## Export

Generates output files.

Examples:

- PNG
- PDF
- CBZ
- ZIP
- Atlas Project

---

# Directory Structure

```text
plugins/

README.md

gemini/
openai/
paddleocr/
lama/
qwen/
local-storage/
pdf-export/
...
```

Every plugin should have its own directory.

---

# Standard Plugin Structure

```text
plugin-name/

README.md
package.json

src/
tests/

assets/
examples/
```

Recommended structure:

```text
src/

index.ts

plugin.ts

config.ts

types.ts

services/

utils/
```

---

# Plugin Lifecycle

Every plugin follows the same lifecycle.

```text
Load
    ↓
Initialize
    ↓
Validate
    ↓
Register
    ↓
Execute
    ↓
Dispose
```

Plugins should release all resources when unloaded.

---

# Plugin Registration

Plugins register themselves through the Plugin SDK.

Example:

```typescript
export default definePlugin({
  id: 'gemini',
  name: 'Google Gemini',
  version: '1.0.0',
});
```

The exact implementation is defined in the Plugin SDK.

---

# Plugin Capabilities

A plugin may expose one or more capabilities.

Examples:

- OCR
- Translation
- Detection
- Inpainting
- Rendering
- Storage
- Review
- Export

The application should discover capabilities dynamically.

---

# Configuration

Each plugin manages its own configuration.

Example:

```json
{
  "enabled": true,
  "priority": 100,
  "settings": {}
}
```

Configuration must never be hardcoded.

---

# Security Rules

Plugins:

✔ May access the Plugin SDK.

✔ May access Atlas Document through public APIs.

✔ May use external APIs.

Plugins must NOT:

✘ Modify application internals.

✘ Access private package APIs.

✘ Modify another plugin.

✘ Execute arbitrary code outside their scope.

---

# Dependency Rules

Plugins may depend on:

- atlas-plugin-sdk
- atlas-types
- atlas-sdk

Plugins must NOT depend on:

- apps/web
- apps/api
- atlas-core internals

Communication must happen through the SDK.

---

# Plugin Discovery

Atlas Studio automatically discovers plugins at startup.

Discovery process:

```text
Scan plugins/
        ↓
Validate
        ↓
Load Metadata
        ↓
Register Plugin
        ↓
Enable
```

Invalid plugins should not prevent the application from starting.

---

# Versioning

Every plugin should define:

- Plugin Version
- Compatible SDK Version
- Minimum Atlas Version

Compatibility should be checked before loading.

---

# Error Handling

A failing plugin must never crash Atlas Studio.

Errors should be isolated and reported through the Plugin Manager.

---

# AI Context

AI coding assistants should treat plugins as isolated modules.

Rules:

- Never bypass the Plugin SDK.
- Never access another plugin directly.
- Do not hardcode provider-specific logic inside the core application.
- New AI providers should always be implemented as plugins.

---

# Future Marketplace

The Plugin System is designed to support a future Plugin Marketplace.

Potential marketplace categories:

- AI Models
- OCR Engines
- Translation Engines
- Rendering Engines
- Storage Providers
- Export Formats
- Productivity Tools

---

# Related Documents

- ../README.md
- ../packages/atlas-plugin-sdk/README.md
- ../docs/06-plugin/
- ../docs/01-architecture/

---

The Plugin System is one of the core pillars of Atlas Studio.

Keeping plugins independent ensures that the platform remains scalable, maintainable, and adaptable to future technologies.
