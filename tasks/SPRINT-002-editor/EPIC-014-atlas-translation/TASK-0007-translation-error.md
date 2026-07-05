---
id: TASK-0007

title: Implement TranslationError

status: Completed

priority: Medium

story_points: 5

sprint: SPRINT-001-foundation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0007 — Implement TranslationError

## Summary

Implement `TranslationError`, the standardized error contract for the Translation Engine.

TranslationError provides a consistent representation of translation failures regardless of the underlying provider.

---

# Capability

After this task is complete, all translation failures can be handled consistently across the Translation Engine.

---

# Goal

Provide a provider-independent error model.

---

# Business Value

The engine can implement retry, diagnostics, recovery, and reporting without depending on provider-specific error formats.

---

# Background

Every provider reports failures differently.

Examples:

- Timeout
- Rate Limit
- Authentication Failure
- Invalid Request
- Model Not Found
- Network Error

TranslationError normalizes those failures.

---

# Scope

## Included

- Error contract
- Error code
- Error message
- Provider reference
- Retryable flag

## Excluded

- Retry implementation
- Diagnostics
- Recovery

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationError.ts
        └── index.ts
```

---

# Public API

```ts
interface TranslationError {
  readonly code: string;

  readonly message: string;

  readonly provider?: string;

  readonly retryable: boolean;
}
```

---

# Dependency

Depends On

- TASK-0004 — TranslationProvider

---

# Risk

Low.

Domain contract only.

---

# Acceptance Criteria

- [ ] TranslationError implemented.
- [ ] Provider independent.
- [ ] Immutable.
- [ ] Public export available.

---

# Definition of Done

All provider failures can be normalized into TranslationError.

---

# Next Task

TASK-0008 — Implement TranslationPipeline
