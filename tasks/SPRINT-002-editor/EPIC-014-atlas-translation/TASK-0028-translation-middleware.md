---
id: TASK-0028

title: Implement TranslationMiddleware

status: Ready

priority: Critical

story_points: 13

sprint: SPRINT-004-provider-layer

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0028 — Implement TranslationMiddleware

## Summary

Implement `TranslationMiddleware`.

TranslationMiddleware provides a composable processing pipeline that executes before and after a TranslationProvider.

Middlewares allow Atlas Studio to extend translation behavior without modifying TranslationProvider implementations.

---

# Capability

After this task is complete, Atlas Studio can compose translation behavior using reusable middleware components.

---

# Goal

Provide a pluggable middleware pipeline around TranslationProvider execution.

---

# Business Value

New features can be introduced without modifying existing providers.

Examples:

- Translation Memory
- Glossary
- Prompt Builder
- Cache
- Metrics
- Logging
- Validation
- Future extensions

---

# Background

TranslationProvider should only communicate with external AI services.

Additional behaviors should be implemented independently as middleware.

---

# Scope

## Included

- Middleware contract
- Middleware chaining
- Request interception
- Response interception

## Excluded

- Translation Memory implementation
- Prompt Builder implementation
- Cache implementation
- Provider execution
- Retry

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationMiddleware.ts
        └── index.ts
```

---

# Responsibilities

TranslationMiddleware is responsible for:

- intercepting TranslationRequest
- invoking the next middleware
- intercepting TranslationResult
- enriching translation execution

TranslationMiddleware is NOT responsible for:

- selecting providers
- registering providers
- executing providers directly
- scheduling

---

# Architecture

```text
TranslationRequest

↓

Middleware A

↓

Middleware B

↓

Middleware C

↓

TranslationProvider

↓

TranslationResult
```

---

# Execution Flow

```text
TranslationRequest

↓

TranslationMemoryMiddleware

↓

GlossaryMiddleware

↓

PromptBuilderMiddleware

↓

TranslationProvider

↓

TranslationResult

↓

MetricsMiddleware

↓

Return Result
```

---

# Public API

```ts
interface TranslationMiddleware {
  handle(
    request: TranslationRequest,
    next: TranslationHandler,
  ): Promise<TranslationResult>;
}
```

Where:

```ts
interface TranslationHandler {
  handle(request: TranslationRequest): Promise<TranslationResult>;
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest
- TASK-0003 — TranslationResult
- TASK-0004 — TranslationProvider

---

# Risk

High

TranslationMiddleware becomes the primary extension mechanism for the Translation Engine.

---

# Files Allowed

```text
packages/atlas-translation/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] TranslationMiddleware contract implemented.
- [ ] Supports middleware chaining.
- [ ] Can intercept requests.
- [ ] Can intercept responses.
- [ ] Independent from TranslationProvider implementation.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Translation features can be added through middleware without modifying TranslationProvider implementations.

---

# AI Constraints

Before implementation:

- Do not implement Translation Memory.
- Do not implement Prompt Builder.
- Do not implement Cache.
- Do not implement Retry.
- Focus only on the middleware contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0002-translation-request.md
- TASK-0003-translation-result.md
- TASK-0004-translation-provider.md
- TASK-0027-provider-resolver.md

---

# Next Task

TASK-0029-prompt-builder.md
