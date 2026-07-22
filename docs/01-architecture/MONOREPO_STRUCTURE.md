# Monorepo Structure

> Status: Stable

Version: 1.0.0

---

# Purpose

This document defines the official directory structure of the Atlas Studio monorepo.

Every package, application, plugin, script, and documentation must follow this structure.

---

# Principles

The monorepo is organized by responsibility.

Top-level directories should remain stable.

Packages must remain independent.

Applications consume packages.

Plugins extend applications.

Documentation is version controlled.

---

# Root Structure

```text
atlas-studio/

├── apps/
├── packages/
├── plugins/
├── docs/
├── schemas/
├── tasks/
├── tooling/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── tsconfig.base.json
└── README.md
```

---

# Directory Responsibilities

## apps/

Contains runnable applications.

Current applications

```text
apps/

web/

api/

ai-worker/
```

Applications may depend on packages.

Applications must not be depended upon.

---

## packages/

Contains reusable libraries.

Examples

```text
packages/

atlas-types

atlas-document

atlas-command

atlas-events

atlas-core
```

Packages should never depend on applications.

---

## plugins/

Contains optional extensions.

Examples

```text
plugins/

google-translate

deepl

openai

ocr-tesseract

export-pdf
```

Plugins communicate only through public APIs.

---

## docs/

Contains architecture and project documentation.

```text
docs/

00-overview/

01-architecture/

02-development/

03-packages/

04-decisions/
```

---

## tasks/

Contains planning documents.

```text
tasks/

sprints/

epics/

tasks/

reviews/
```

No source code should exist here.

---

## tooling/

Contains developer tooling.

Examples

```text
tooling/

codegen/

templates/

codemods/

generators/
```

The checked-in `sync-monorepo.mjs` command keeps internal workspace ranges and
TypeScript Project References aligned with package manifests.

---

# Workspace Toolchain

- pnpm is the only JavaScript package manager for the repository.
- `pnpm-lock.yaml` is the only dependency lockfile.
- Turborepo schedules tasks using package dependency order.
- Internal `@atlas/*` dependencies use `workspace:*`.
- TypeScript packages extend the root `tsconfig.base.json`. Their generated
  `tsconfig.build.json` files enable composite builds and declare project
  references to internal dependencies.

All dependency installation and shared tasks run from the repository root.

```bash
pnpm install
pnpm dev
pnpm build
pnpm check
```

---

# Package Structure

Every package follows the same layout.

```text
atlas-package/

src/

tests/

docs/

package.json

README.md

CHANGELOG.md

tsconfig.json

tsconfig.build.json

tsup.config.ts
```

---

# Source Structure

```text
src/

index.ts

internal/

feature-a/

feature-b/

utils/
```

Only index.ts is public.

---

# Testing Structure

```text
tests/

unit/

integration/

fixtures/
```

---

# Documentation Structure

```text
README.md

API.md

ARCHITECTURE.md

CHANGELOG.md

CONTRIBUTING.md
```

---

# Import Rules

Allowed

```text
packages/

↓

apps
```

Forbidden

```text
apps

↓

packages/src/internal
```

---

# Package Ownership

Every package owns:

- Source
- Tests
- Documentation
- Build configuration

No package owns another package.

---

# Dependency Direction

```text
atlas-core

↓

atlas-command

↓

atlas-document

↓

atlas-types
```

Dependencies always point downward.

---

# Naming Rules

Directories

kebab-case

Packages

atlas-\*

Classes

PascalCase

Files

PascalCase.ts

Interfaces

I\*

Enums

PascalCase

Constants

UPPER_SNAKE_CASE

---

# Summary

The monorepo structure is fixed.

Future packages should conform to this layout.

Structural changes require an Architecture Decision Record (ADR).
