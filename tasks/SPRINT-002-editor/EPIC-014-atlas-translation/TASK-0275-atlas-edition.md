---
id: TASK-0275

title: Implement AtlasEdition

status: Ready

priority: Critical

story_points: 55

sprint: SPRINT-028-atlas-developer-platform

epic: EPIC-022

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0275 — Implement AtlasEdition

## Summary

Implement `AtlasEdition`.

AtlasEdition provides the provider-independent abstraction representing product editions across the Atlas ecosystem.

An edition defines the capabilities, feature availability, constraints, and metadata associated with a specific product variant while remaining independent from licensing and billing implementations.

---

# Capability

After this task is complete, Atlas products support multiple editions through reusable edition abstractions.

---

# Goal

Provide unified edition model.

---

# Business Value

Supports

- Community Edition
- Professional Edition
- Enterprise Edition
- Cloud Edition
- OEM Edition
- Future commercial offerings

without coupling edition definitions to licensing providers.

---

# Background

AtlasProduct defines products.

AtlasEdition defines variants of a product.

Each product may expose multiple editions with different capabilities.

---

# Scope

## Included

- Edition abstraction
- Edition metadata
- Capability model
- Feature availability
- Edition constraints

## Excluded

- Licensing
- Billing
- Marketplace
- UI

---

# Deliverables

```text
atlas-translation/

AtlasEdition.ts

AtlasEditionCatalog.ts

AtlasEditionDefinition.ts

AtlasEditionMetadata.ts

AtlasEditionCapabilities.ts

index.ts
```

---

# Responsibilities

AtlasEdition is responsible for

- exposing edition metadata
- exposing available capabilities
- defining feature availability
- exposing edition constraints
- remaining provider independent

AtlasEdition is NOT responsible for

- licensing
- subscriptions
- billing
- UI

---

# Architecture

```text
Atlas Product

├── Community Edition
├── Professional Edition
├── Enterprise Edition
└── Cloud Edition
```

---

# Public API

```ts
interface AtlasEdition {
  readonly product: AtlasProduct;

  readonly capabilities: AtlasEditionCapabilities;

  readonly metadata: AtlasEditionMetadata;
}
```

---

# Supported Editions

Open Source

- Community

Commercial

- Professional
- Enterprise

Cloud

- Cloud Hosted

Future

- OEM
- Government
- Education
- Partner

---

# Dependency

Depends On

- TASK-0272 — AtlasCommercialPlatform
- TASK-0273 — AtlasProductPlatform
- TASK-0274 — AtlasSuite

---

# Risk

Critical

AtlasEdition becomes the reusable abstraction representing product variants.

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

- [ ] AtlasEdition implemented.
- [ ] Supports multiple product editions.
- [ ] Supports capability abstraction.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas products expose reusable edition abstractions independent from commercial implementations.

---

# AI Constraints

Before implementation

- Do not implement licensing.
- Do not implement billing.
- Do not implement marketplace.
- Do not implement UI.
- Focus only on AtlasEdition abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0272-atlas-commercial-platform.md
- TASK-0273-atlas-product-platform.md
- TASK-0274-atlas-suite.md

---

# Next Task

TASK-0276-atlas-feature-management.md
