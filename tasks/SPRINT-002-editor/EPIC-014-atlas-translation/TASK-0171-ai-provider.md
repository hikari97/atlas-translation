---
id: TASK-0171

title: Implement AIProvider

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

# TASK-0171 — Implement AIProvider

## Summary

Implement `AIProvider`.

AIProvider defines the abstraction responsible for executing inference requests using local or remote AI models.

Providers are interchangeable and platform independent.

---

# Capability

After this task is complete, Atlas Translation Platform can communicate with multiple AI engines through a unified interface.

---

# Goal

Provide standardized AI inference access.

---

# Business Value

Supports

- Local AI
- Cloud AI
- OCR AI
- Translation AI
- Plugin AI
- Future multimodal AI

without changing Atlas Core.

---

# Background

Different AI engines expose different APIs.

Atlas Core communicates only through AIProvider contracts.

---

# Scope

## Included

- Provider contract
- Provider metadata
- Provider capability
- Inference abstraction

## Excluded

- Prompt engineering
- Model registry
- Tool calling
- Safety

---

# Deliverables

```text
atlas-translation/

AIProvider.ts

AIMetadata.ts

AICapability.ts

AIInferenceRequest.ts

AIInferenceResult.ts

index.ts
```

---

# Responsibilities

AIProvider is responsible for

- loading models
- executing inference
- exposing provider capabilities
- returning inference results

AIProvider is NOT responsible for

- prompt optimization
- model management
- tool execution
- safety filtering

---

# Architecture

```text
Inference Request

↓

AIManager

↓

AIProvider

↓

AI Model
```

---

# Public API

```ts
interface AIProvider {
  readonly metadata: AIMetadata;

  infer(request: AIInferenceRequest): Promise<AIInferenceResult>;
}
```

---

# Supported Providers

Current

- Local Provider

Future

- OpenAI
- Anthropic
- Gemini
- Ollama
- llama.cpp
- ONNX Runtime
- TensorRT
- Plugin Provider

---

# Dependency

Depends On

- TASK-0103 — PluginManager

---

# Risk

High

AIProvider becomes the abstraction layer for every AI engine supported by Atlas Translation Platform.

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

- [ ] AIProvider implemented.
- [ ] Provider independent.
- [ ] Supports inference.
- [ ] Supports local and remote models.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform executes AI inference through interchangeable AIProviders.

---

# AI Constraints

Before implementation

- Do not implement Prompt Engine.
- Do not implement Model Registry.
- Do not implement Tool Calling.
- Focus only on AIProvider abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md

---

# Next Task

TASK-0172-ai-manager.md
