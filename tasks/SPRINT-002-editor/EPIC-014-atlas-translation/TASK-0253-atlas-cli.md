---
id: TASK-0253

title: Implement AtlasCLI

status: Ready

priority: Critical

story_points: 34

sprint: SPRINT-026-atlas-platform

epic: EPIC-020

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0253 — Implement AtlasCLI

## Summary

Implement `AtlasCLI`.

AtlasCLI provides the official command-line interface for interacting with Atlas Translation Platform through the public AtlasSDK.

The CLI exposes developer-oriented commands while remaining independent from platform implementation details.

---

# Capability

After this task is complete, developers can manage Atlas projects through a consistent command-line experience.

---

# Goal

Provide official Atlas command-line tooling.

---

# Business Value

Supports

- Developer productivity
- Project scaffolding
- Automation
- CI/CD integration
- DevOps workflows
- Future commercial tooling

without exposing internal platform APIs.

---

# Background

AtlasSDK provides programmatic APIs.

AtlasCLI provides a terminal interface built on top of AtlasSDK.

This ensures a single public integration surface.

---

# Scope

## Included

- CLI abstraction
- Command model
- Command registry
- Command execution
- CLI metadata

## Excluded

- Shell completion
- Package manager integration
- Interactive TUI
- UI

---

# Deliverables

```text
atlas-translation/

AtlasCLI.ts

AtlasCLICommand.ts

AtlasCLIRegistry.ts

AtlasCLIContext.ts

AtlasCLIMetadata.ts

index.ts
```

---

# Responsibilities

AtlasCLI is responsible for

- registering CLI commands
- executing commands
- exposing CLI metadata
- remaining SDK-driven
- remaining provider independent

AtlasCLI is NOT responsible for

- implementing platform logic
- SDK implementation
- UI
- shell integration

---

# Architecture

```text
Developer

↓

AtlasCLI

↓

AtlasSDK

↓

AtlasPlatform

↓

Internal Services
```

---

# Public API

```ts
interface AtlasCLI {
  register(command: AtlasCLICommand): void;

  execute(argv: readonly string[]): Promise<number>;
}
```

---

# Supported Commands

Project

- init
- create
- build
- clean

Platform

- doctor
- config
- version
- info

Extension

- install
- uninstall
- list
- publish

Workflow

- run
- validate
- export

Future

- cloud
- login
- deploy
- marketplace

---

# Dependency

Depends On

- TASK-0252 — AtlasSDK

---

# Risk

Critical

AtlasCLI becomes the official command-line interface for Atlas Translation Platform.

---

# Files Allowed

```text
atlas-translation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] AtlasCLI implemented.
- [ ] Supports command registration.
- [ ] Executes commands through AtlasSDK.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform exposes official command-line tooling through reusable AtlasCLI abstractions.

---

# AI Constraints

Before implementation

- Do not implement shell completion.
- Do not implement package manager integration.
- Do not implement interactive TUI.
- Do not implement UI.
- Focus only on AtlasCLI abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0252-atlas-sdk.md

---

# Next Task

TASK-0254-atlas-cloud.md
