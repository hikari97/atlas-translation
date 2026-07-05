---
id: TASK-0006

title: Implement TranslationCapabilities

status: Completed

priority: High

story_points: 5

sprint: SPRINT-001-foundation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0006 — Implement TranslationCapabilities

## Summary

Implement `TranslationCapabilities`, describing the features supported by a TranslationProvider.

Capabilities allow the Translation Engine to discover provider functionality without depending on provider implementations.

---

# Capability

After this task is complete, Atlas Studio can determine which providers support specific translation features before executing a request.

---

# Goal

Provide a feature-discovery contract for Translation Providers.

---

# Business Value

The engine can automatically select the most suitable provider based on project requirements and provider capabilities.

---

# Background

Not every provider supports the same functionality.

Examples:

- Streaming
- Vision
- Structured Output
- Glossary
- Translation Memory
- Batch Translation
- Context Window

Capabilities should be discoverable before execution.

---

# Scope

## Included

- Capability model
- Feature discovery
- Immutable metadata

## Excluded

- Provider selection
- Provider registry
- Runtime negotiation

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationCapabilities.ts
        └── index.ts
```

---

# Responsibilities

TranslationCapabilities is responsible for:

- exposing supported features
- remaining immutable
- remaining provider independent

---

# Public API

```ts
interface TranslationCapabilities {
  readonly streaming: boolean;

  readonly vision: boolean;

  readonly glossary: boolean;

  readonly translationMemory: boolean;

  readonly batchTranslation: boolean;

  readonly structuredOutput: boolean;
}
```

---

# Dependency

Depends On

- TASK-0004 — TranslationProvider

---

# Risk

Low.

Metadata only.

---

# Acceptance Criteria

- [ ] TranslationCapabilities implemented.
- [ ] Immutable.
- [ ] Public export available.
- [ ] Strict mode passes.

---

# Definition of Done

Translation Engine can inspect provider capabilities without calling the provider.

---

# Next Task

TASK-0007 — TranslationError
