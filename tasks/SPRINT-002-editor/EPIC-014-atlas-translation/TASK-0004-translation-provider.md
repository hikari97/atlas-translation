---
id: TASK-0004

title: Implement TranslationProvider

status: Completed

priority: Critical

story_points: 8

sprint: SPRINT-001-foundation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0004 — Implement TranslationProvider

## Summary

Implement the TranslationProvider contract.

TranslationProvider defines the public contract implemented by every AI translation provider supported by Atlas Studio.

The Translation Engine communicates only with this contract and must never depend on provider-specific implementations.

---

# Capability

After this task is complete, Atlas Studio can support multiple AI providers through a single stable interface.

---

# Goal

Provide a provider-independent contract that enables interchangeable AI translation backends.

---

# Business Value

Users can switch between OpenAI, Gemini, Claude, Ollama, DeepL, or future providers without changing the Translation Engine.

---

# Background

AI providers expose different APIs, authentication methods, and response formats.

The Translation Engine should remain independent from those differences.

TranslationProvider normalizes provider interaction into one stable contract.

---

# Scope

## Included

- Provider contract
- Provider metadata
- Provider capabilities
- Execution contract

## Excluded

- Provider registry
- Provider implementation
- Provider selection
- Provider configuration
- Prompt generation

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationProvider.ts
        └── index.ts
```

---

# Responsibilities

TranslationProvider is responsible for:

- accepting TranslationRequest
- returning TranslationResult
- exposing provider capabilities
- exposing provider metadata

TranslationProvider is NOT responsible for:

- workflow
- scheduling
- queue management
- retry
- translation memory

---

# Architecture

```text
TranslationStage

↓

TranslationRequest

↓

TranslationProvider

↓

TranslationResult
```

---

# Public API

```ts
interface TranslationProvider {
  readonly id: string;

  readonly name: string;

  readonly capabilities: readonly ProviderCapability[];

  execute(request: TranslationRequest): Promise<TranslationResult>;
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0003 — TranslationResult

---

# Risk

Medium.

This contract will be implemented by every AI provider.

---

# Files Allowed

```text
packages/atlas-translation/src/**
```

---

# Acceptance Criteria

- [ ] TranslationProvider contract implemented.
- [ ] Provider independent.
- [ ] Public export available.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Every Translation Provider can implement this interface without modifying the Translation Engine.

---

# AI Constraints

Before implementation:

- Do not implement OpenAI.
- Do not implement Gemini.
- Do not implement Claude.
- Do not implement provider selection.
- Focus only on the provider contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md
- TASK-0003-translation-result.md

---

# Next Task

TASK-0005 — TranslationOptions
