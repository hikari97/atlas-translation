---
id: TASK-0172

title: Implement AIManager

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

# TASK-0172 — Implement AIManager

## Summary

Implement `AIManager`.

AIManager coordinates AIProviders and exposes a unified runtime for model discovery, model selection, inference execution, and runtime lifecycle.

AIManager is provider independent.

---

# Capability

After this task is complete, Atlas Translation Platform can execute AI inference through interchangeable AI providers.

---

# Goal

Provide centralized AI runtime management.

---

# Business Value

Supports

- Multiple AI providers
- Local AI
- Cloud AI
- OCR AI
- Translation AI
- Plugin AI

without changing Atlas Core.

---

# Background

Applications may use multiple AI providers simultaneously.

AIManager coordinates providers while exposing a unified runtime API.

---

# Scope

## Included

- Provider registration
- Provider resolution
- Model runtime resolution
- Inference execution
- Runtime lifecycle

## Excluded

- Prompt Engine
- Model Registry
- Tool Calling
- Safety

---

# Deliverables

```text
atlas-translation/

AIManager.ts

AIRegistry.ts

AIProviderResolver.ts

index.ts
```

---

# Responsibilities

AIManager is responsible for

- registering providers
- resolving providers
- resolving model runtimes
- executing inference
- exposing AI runtime

AIManager is NOT responsible for

- prompt engineering
- safety filtering
- tool execution
- provider implementation

---

# Architecture

```text
AIInferenceRequest

↓

AIManager

↓

AIProviderResolver

↓

AIProvider

↓

AIModelRuntime

↓

AI Model
```

---

# Public API

```ts
interface AIManager {
  register(provider: AIProvider): void;

  infer(request: AIInferenceRequest): Promise<AIInferenceResult>;
}
```

---

# Supported Features

- Provider registration
- Multiple providers
- Runtime selection
- Inference execution
- Provider resolution

---

# Dependency

Depends On

- TASK-0103 — PluginManager
- TASK-0171 — AIProvider

---

# Risk

High

AIManager becomes the centralized runtime for every AI capability inside Atlas Translation Platform.

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

- [ ] AIManager implemented.
- [ ] Supports provider registration.
- [ ] Provider independent.
- [ ] Supports runtime selection.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform manages AI execution through AIManager using interchangeable AIProviders.

---

# AI Constraints

Before implementation

- Do not implement Prompt Engine.
- Do not implement Model Registry.
- Do not implement Tool Calling.
- Focus only on AI coordination.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0103-plugin-manager.md
- TASK-0171-ai-provider.md

---

# Next Task

TASK-0173-ai-pipeline.md
