---
id: TASK-0183

title: Implement AITokenizer

status: Ready

priority: High

story_points: 13

sprint: SPRINT-020-ai-runtime-extensions

epic: EPIC-016

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0183 — Implement AITokenizer

## Summary

Implement `AITokenizer`.

AITokenizer provides a provider-independent abstraction for tokenizing and detokenizing text according to the tokenizer associated with an AI model.

It enables accurate token counting, context window validation, prompt budgeting, and future prompt optimization.

---

# Capability

After this task is complete, Atlas Translation Platform can tokenize text independently of AI providers.

---

# Goal

Provide standardized tokenization services.

---

# Business Value

Supports

- Token counting
- Context window validation
- Prompt budgeting
- Cost estimation
- Future prompt optimization
- Future chunking strategies

without modifying AIProviders.

---

# Background

Every AI model has its own tokenizer.

Atlas Translation Platform should expose a unified tokenizer abstraction instead of relying on provider-specific implementations.

---

# Scope

## Included

- Tokenization
- Detokenization
- Token counting
- Token metadata
- Tokenizer abstraction

## Excluded

- Prompt generation
- Embedding generation
- Model execution
- UI

---

# Deliverables

```text
atlas-translation/

AITokenizer.ts

AIToken.ts

AITokenSequence.ts

AITokenizerMetadata.ts

index.ts
```

---

# Responsibilities

AITokenizer is responsible for

- tokenizing text
- detokenizing tokens
- counting tokens
- exposing tokenizer metadata

AITokenizer is NOT responsible for

- inference
- prompt construction
- provider implementation
- UI

---

# Architecture

```text
Text

↓

AITokenizer

↓

Token Sequence

↓

Prompt Engine

↓

AIProvider
```

---

# Public API

```ts
interface AITokenizer {
  tokenize(text: string): Promise<AITokenSequence>;

  detokenize(tokens: AITokenSequence): Promise<string>;
}
```

---

# Supported Features

Token Operations

- Tokenize
- Detokenize
- Count Tokens
- Validate Context Window

Future

- Chunking
- Prompt Budgeting
- Cost Estimation

---

# Dependency

Depends On

- TASK-0177 — AIModelRegistry
- TASK-0178 — AIPromptEngine

---

# Risk

Medium

AITokenizer becomes the standardized tokenization layer for all AI models.

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

- [ ] AITokenizer implemented.
- [ ] Supports tokenize/detokenize.
- [ ] Provider independent.
- [ ] Immutable token sequence.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform tokenizes prompts through a reusable AITokenizer abstraction.

---

# AI Constraints

Before implementation

- Do not implement Prompt Engine.
- Do not implement inference.
- Do not implement provider-specific tokenizers.
- Focus only on the AITokenizer abstraction.

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

TASK-0184-ai-tool-calling.md
