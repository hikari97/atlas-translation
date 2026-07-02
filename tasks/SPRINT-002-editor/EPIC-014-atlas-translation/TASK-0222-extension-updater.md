---
id: TASK-0222

title: Implement ExtensionUpdater

status: Ready

priority: High

story_points: 21

sprint: SPRINT-023-extension-platform

epic: EPIC-018

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0222 — Implement ExtensionUpdater

## Summary

Implement `ExtensionUpdater`.

ExtensionUpdater provides a provider-independent abstraction responsible for detecting, validating, planning, and applying updates to installed Atlas extensions.

Updating extensions is independent from installation, runtime execution, and marketplace synchronization.

---

# Capability

After this task is complete, Atlas Translation Platform can safely update installed extensions through reusable update workflows.

---

# Goal

Provide standardized extension update management.

---

# Business Value

Supports

- Version upgrades
- Security patches
- Compatibility validation
- Controlled rollouts
- Rollback preparation
- Future enterprise fleet updates

without modifying ExtensionManager.

---

# Background

Updating an extension requires more than replacing package contents.

ExtensionUpdater validates compatibility, evaluates update plans, and preserves runtime stability throughout the update process.

---

# Scope

## Included

- Update detection
- Update validation
- Update planning
- Update execution
- Update metadata

## Excluded

- Marketplace synchronization
- Automatic downloads
- Runtime execution
- UI

---

# Deliverables

```text
atlas-translation/

ExtensionUpdater.ts

ExtensionUpdatePlan.ts

ExtensionUpdateResult.ts

ExtensionUpdateMetadata.ts

ExtensionUpdatePolicy.ts

index.ts
```

---

# Responsibilities

ExtensionUpdater is responsible for

- detecting update eligibility
- validating compatibility
- preparing update plans
- applying updates
- exposing update metadata

ExtensionUpdater is NOT responsible for

- downloading packages
- extension execution
- marketplace integration
- UI

---

# Architecture

```text
Installed Extension

↓

ExtensionUpdater

↓

Update Plan

↓

ExtensionInstaller

↓

ExtensionRegistry

↓

ExtensionManager
```

---

# Public API

```ts
interface ExtensionUpdater {
  check(extensionId: string): Promise<ExtensionUpdateResult>;

  plan(
    extensionId: string,
    pkg: ExtensionPackage,
  ): Promise<ExtensionUpdatePlan>;

  update(plan: ExtensionUpdatePlan): Promise<ExtensionUpdateResult>;
}
```

---

# Supported Operations

Detection

- Version Check
- Compatibility Check
- Dependency Check

Planning

- Update Plan
- Validation
- Rollback Preparation

Execution

- Upgrade
- Patch
- Rollback

Future

- Incremental Updates
- Staged Rollouts
- Organization-wide Updates

---

# Dependency

Depends On

- TASK-0220 — ExtensionPackage
- TASK-0221 — ExtensionInstaller

---

# Risk

Medium

ExtensionUpdater becomes the standardized lifecycle component for maintaining installed Atlas extensions.

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

- [ ] ExtensionUpdater implemented.
- [ ] Supports update planning.
- [ ] Supports compatibility validation.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform updates installed extensions through reusable ExtensionUpdater abstractions.

---

# AI Constraints

Before implementation

- Do not implement package downloads.
- Do not implement marketplace synchronization.
- Do not implement automatic background updates.
- Focus only on the ExtensionUpdater abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0220-extension-package.md
- TASK-0221-extension-installer.md

---

# Next Task

TASK-0223-extension-signature.md
