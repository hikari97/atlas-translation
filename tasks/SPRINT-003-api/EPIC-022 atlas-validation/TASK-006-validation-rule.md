---
id: TASK-006

title: Implement Validation Rule

status: Completed

priority: Critical

story_points: 55

sprint: SPRINT-003-api

epic: EPIC-022

package: atlas-validation

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-006 — Implement Validation Rule

## Summary

Implement `ValidationRule`.

ValidationRule provides the provider-independent abstraction responsible for defining individual validation rules within the Atlas ecosystem.

Rather than validating complete objects directly, each ValidationRule validates a single aspect of the validation input. Multiple rules may be composed together by ValidationExecutor to produce a complete validation result while remaining independent from runtime environments, networking implementations, dependency injection frameworks, and transport protocols.

---

# Capability

After this task is complete, Atlas provides reusable validation rules capable of validating arbitrary data across multiple transports.

---

# Goal

Provide unified validation rule abstraction.

---

# Business Value

Supports

- Rule composition
- Reusable validation rules
- Custom validation
- Strong typing
- Provider independence

without coupling Atlas Validation to runtime-specific validation libraries.

---

# Background

Validation is composed of multiple independent rules.

Separating rules from validators improves modularity, reuse, testing, and future extensibility.

---

# Scope

## Included

- Rule abstraction
- Rule evaluation contract
- Rule metadata
- Rule composition
- Rule lifecycle

## Excluded

- Validation execution
- Schema parsing
- Dependency Injection
- Networking
- UI

---

# Deliverables

```text
atlas-validation/

ValidationRule.ts

ValidationRuleResult.ts

ValidationRuleMetadata.ts

ValidationRuleCollection.ts

ValidationRuleLifecycle.ts

index.ts
```

---

# Responsibilities

ValidationRule is responsible for

- validating one rule
- returning rule results
- exposing rule metadata
- supporting composition
- remaining provider independent

ValidationRule is NOT responsible for

- executing validators
- aggregating validation results
- dependency injection
- networking
- UI

---

# Architecture

```text
Validation

        │

        ▼

ValidationExecutor

        │

        ▼

ValidationRule

├── Metadata
├── Lifecycle
└── Result

        │

        ▼

ValidationRuleResult
```

---

# Public API

```ts
interface ValidationRule {
  validate(context: ValidationContext): Promise<ValidationRuleResult>;
}
```

---

# Supported Rule Types

Basic

- Required
- Nullable
- Empty

String

- MinLength
- MaxLength
- Pattern
- Email
- URL

Number

- Minimum
- Maximum
- Range

Collection

- MinItems
- MaxItems
- Unique

Custom

- Predicate Rule
- Async Rule

Future

- Cross Field Rule
- Conditional Rule
- Composite Rule
- Nested Rule

---

# Dependency

Depends On

- TASK-002 — Validation Interface
- TASK-003 — Validation Context

---

# Risk

Critical

ValidationRule becomes the standardized validation rule abstraction across the Atlas ecosystem.

---

# Files Allowed

```text
atlas-validation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [x] ValidationRule implemented.
- [x] Supports synchronous and asynchronous rules.
- [x] Returns ValidationRuleResult.
- [x] Supports rule metadata.
- [x] Provider independent.
- [x] TypeScript strict mode passes.

---

# Definition of Done

Atlas exposes reusable validation rules capable of validating individual aspects of input independently from runtime environments and transport protocols.

---

# AI Constraints

Before implementation

- Do not implement schema parsing.
- Do not implement validation aggregation.
- Do not implement dependency injection.
- Do not implement networking.
- Focus only on ValidationRule abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-002-validation-interface.md
- TASK-003-validation-context.md

---

# Next Task

TASK-007-validation-executor.md
