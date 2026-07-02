---
id: TASK-0181

title: Implement AIContextManager

status: Ready

priority: Critical

story_points: 21

sprint: SPRINT-020-ai-runtime-extensions

epic: EPIC-016

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0181 — Implement AIContextManager

## Summary

Implement `AIContextManager`.

AIContextManager is responsible for collecting, composing, prioritizing, and preparing contextual information before prompt construction.

It provides a provider-independent abstraction for assembling inference context from multiple sources.

---

# Capability

After this task is complete, Atlas Translation Platform can build reusable AI context independently of prompt construction and provider implementation.

---

# Goal

Provide centralized AI context management.

---

# Business Value

Supports

- Conversation history
- Project context
- Document context
- User preferences
- Future Retrieval-Augmented Generation (RAG)
- Future multi-document reasoning

without modifying Prompt Engine or AI Providers.

---

# Background

Modern AI systems rarely use only user input.

Context may originate from many independent sources.

AIContextManager centralizes context composition while remaining provider independent.

---

# Scope

## Included

- Context registration
- Context composition
- Context prioritization
- Context metadata
- Context lifecycle

## Excluded

- Embedding generation
- Vector search
- Tool Calling
- Safety filtering

---

# Deliverables

```text
atlas-translation/

AIContextManager.ts

AIContext.ts

AIContextSource.ts

AIContextMetadata.ts

AIContextPriority.ts

index.ts
```

---

# Responsibilities

AIContextManager is responsible for

- collecting context
- composing context
- prioritizing context
- exposing context metadata

AIContextManager is NOT responsible for

- prompt generation
- inference execution
- embedding generation
- provider implementation

---

# Architecture

```text
Conversation

Project

Document

User Preferences

External Context

↓

AIContextManager

↓

AIContext

↓

AIPromptEngine

↓

AIProvider
```

---

# Public API

```ts
interface AIContextManager {
  collect(request: AIContextRequest): Promise<AIContext>;
}
```

---

# Supported Context Sources

Internal

- Conversation History
- Active Document
- Project Metadata
- User Preferences

Future

- Vector Store
- Knowledge Base
- External APIs
- Plugin Context

---

# Dependency

Depends On

- TASK-0177 — AIModelRegistry
- TASK-0178 — AIPromptEngine

---

# Risk

High

AIContextManager becomes the centralized context orchestration layer for every AI workflow.

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

- [ ] AIContextManager implemented.
- [ ] Supports multiple context sources.
- [ ] Provider independent.
- [ ] Immutable context model.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform constructs reusable AI context through AIContextManager.

---

# AI Constraints

Before implementation

- Do not implement embeddings.
- Do not implement retrieval.
- Do not implement Tool Calling.
- Focus only on AIContextManager abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0177-ai-model-registry.md
- TASK-0178-ai-prompt-engine.md

---

# Next Task

TASK-0182-ai-embedding-service.md
