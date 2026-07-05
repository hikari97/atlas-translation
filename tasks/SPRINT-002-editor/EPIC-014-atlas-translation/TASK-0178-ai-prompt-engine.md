---
id: TASK-0178

title: Implement AIPromptEngine

status: Completed

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

# TASK-0178 — Implement AIPromptEngine

## Summary

Implement `AIPromptEngine`.

AIPromptEngine is responsible for constructing provider-independent prompts from structured inputs, templates, context, variables, and conversation history.

The Prompt Engine prepares inference-ready prompts without depending on any specific AI provider.

---

# Capability

After this task is complete, Atlas Translation Platform can generate standardized prompts for every supported AI provider.

---

# Goal

Provide reusable prompt construction.

---

# Business Value

Supports

- Chat prompts
- Translation prompts
- OCR prompts
- Vision prompts
- Prompt templates
- Future RAG workflows

without modifying AIProviders.

---

# Background

Modern AI systems build prompts from multiple sources rather than raw strings.

AIPromptEngine centralizes prompt construction while remaining provider independent.

---

# Scope

## Included

- Prompt construction
- Template expansion
- Variable substitution
- Context composition
- Prompt metadata

## Excluded

- Tool Calling
- Context retrieval
- Safety filtering
- Inference execution

---

# Deliverables

```text
atlas-translation/

AIPromptEngine.ts

AIPrompt.ts

AIPromptTemplate.ts

AIPromptVariable.ts

AIPromptContext.ts

index.ts
```

---

# Responsibilities

AIPromptEngine is responsible for

- constructing prompts
- expanding templates
- injecting variables
- composing context
- producing provider-independent prompts

AIPromptEngine is NOT responsible for

- executing inference
- retrieving knowledge
- calling tools
- provider implementation

---

# Architecture

```text
User Input

↓

Prompt Template

↓

Context

↓

Variables

↓

AIPromptEngine

↓

AIPrompt

↓

AIPipeline

↓

AIProvider
```

---

# Public API

```ts
interface AIPromptEngine {
  build(request: AIPromptRequest): Promise<AIPrompt>;
}
```

---

# Supported Features

Prompt Sources

- User Prompt
- System Prompt
- Context Prompt
- Conversation History

Template Features

- Variables
- Conditional Sections
- Reusable Templates
- Metadata

---

# Dependency

Depends On

- TASK-0173 — AIPipeline
- TASK-0177 — AIModelRegistry

---

# Risk

High

AIPromptEngine becomes the foundation for all prompt construction within Atlas Translation Platform.

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

- [ ] AIPromptEngine implemented.
- [ ] Supports template expansion.
- [ ] Supports variable injection.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform constructs reusable AI prompts through AIPromptEngine.

---

# AI Constraints

Before implementation

- Do not implement Tool Calling.
- Do not implement Context Retrieval.
- Do not implement Safety filtering.
- Focus only on prompt construction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0173-ai-pipeline.md
- TASK-0177-ai-model-registry.md

---

# Next Task

TASK-0179-ai-inference-session.md
