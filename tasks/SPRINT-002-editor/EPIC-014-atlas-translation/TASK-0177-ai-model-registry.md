---
id: TASK-0177

title: Implement AIModelRegistry

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-019-ai-system

epic: EPIC-016

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0177 — Implement AIModelRegistry

## Summary

Implement `AIModelRegistry`.

AIModelRegistry provides a centralized catalog of AI models available to Atlas Translation Platform.

The registry is responsible for model discovery, registration, capability lookup, version tracking, and runtime selection while remaining provider independent.

---

# Capability

After this task is complete, Atlas Translation Platform can discover and select AI models through a standardized registry.

---

# Goal

Provide centralized AI model management.

---

# Business Value

Supports

- Local models
- Cloud models
- OCR models
- Translation models
- Vision models
- Embedding models
- Future multimodal models

without modifying AIProviders.

---

# Background

Multiple AI providers may expose dozens or hundreds of models.

Rather than embedding model selection logic into AIManager, Atlas Translation Platform delegates model discovery and capability lookup to AIModelRegistry.

---

# Scope

## Included

- Model registration
- Model discovery
- Capability lookup
- Version metadata
- Runtime lookup

## Excluded

- Model download
- Model execution
- Prompt Engine
- Tool Calling

---

# Deliverables

```text
atlas-translation/

AIModelRegistry.ts

AIModel.ts

AIModelCapability.ts

AIModelVersion.ts

AIModelMetadata.ts

index.ts
```

---

# Responsibilities

AIModelRegistry is responsible for

- registering models
- discovering models
- exposing capabilities
- resolving model metadata
- resolving runtime compatibility

AIModelRegistry is NOT responsible for

- inference execution
- provider implementation
- prompt generation
- tool execution

---

# Architecture

```text
AIManager

↓

AIModelRegistry

↓

AIModel

↓

AIProvider

↓

AI Runtime
```

---

# Public API

```ts
interface AIModelRegistry {
  register(model: AIModel): void;

  unregister(modelId: string): void;

  find(modelId: string): AIModel | undefined;

  list(): readonly AIModel[];
}
```

---

# Suggested Model Information

Identity

- Model ID
- Name
- Version
- Provider

Capabilities

- Chat
- Translation
- OCR
- Vision
- Embedding
- Speech
- Tool Calling

Runtime

- Context Window
- Maximum Tokens
- Streaming Support
- Multimodal Support

---

# Dependency

Depends On

- TASK-0171 — AIProvider
- TASK-0172 — AIManager

---

# Risk

High

AIModelRegistry becomes the centralized catalog for every AI model used by Atlas Translation Platform.

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

- [ ] AIModelRegistry implemented.
- [ ] Supports model registration.
- [ ] Supports capability lookup.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform manages AI models through a reusable AIModelRegistry.

---

# AI Constraints

Before implementation

- Do not implement model downloading.
- Do not implement inference execution.
- Do not implement Prompt Engine.
- Focus only on AIModelRegistry abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0171-ai-provider.md
- TASK-0172-ai-manager.md

---

# Next Task

TASK-0178-ai-prompt-engine.md
