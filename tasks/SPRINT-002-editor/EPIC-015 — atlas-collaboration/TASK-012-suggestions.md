---
id: TASK-012

title: Implement Suggestions

status: Completed

priority: High

story_points: 21

sprint: SPRINT-002-editor

epic: EPIC-015

package: atlas-collaboration

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-03
---

# TASK-012 — Implement Suggestions

## Summary

Implement `Suggestions`.

Suggestions provides the provider-independent abstraction responsible for representing proposed document modifications within collaborative editing sessions.

Suggestions allow participants to propose additions, deletions, replacements, formatting changes, and structural modifications without immediately modifying the underlying document.

---

# Capability

After this task is complete, Atlas Editor supports standardized collaborative suggestions and change proposals.

---

# Goal

Provide unified suggestion abstraction.

---

# Business Value

Supports

- Track Changes
- Suggested Edits
- Editorial Workflow
- Peer Review
- Provider Independence
- Future AI-assisted Suggestions

without coupling suggestion management to document implementations.

---

# Background

Comments provide discussions.

Suggestions represent document modifications that may later be accepted or rejected.

Unlike direct document editing, suggestions are pending changes until explicitly resolved.

---

# Scope

## Included

- Suggestion abstraction
- Suggestion registry
- Suggestion metadata
- Suggestion lifecycle
- Suggestion status

## Excluded

- Document modification
- Synchronization
- Rendering
- Networking
- Storage
- UI

---

# Deliverables

```text
atlas-collaboration/

Suggestions.ts

Suggestion.ts

SuggestionRegistry.ts

SuggestionMetadata.ts

SuggestionLifecycle.ts

SuggestionStatus.ts

index.ts
```

---

# Responsibilities

Suggestions is responsible for

- managing document suggestions
- exposing suggestion metadata
- managing suggestion lifecycle
- managing suggestion status
- remaining provider independent

Suggestions is NOT responsible for

- modifying documents
- rendering suggestions
- synchronization
- networking
- UI

---

# Architecture

```text
Suggestions

├── Suggestion Registry
├── Suggestion Metadata
├── Suggestion Status
└── Suggestion Lifecycle

↓

Review

↓

Document Merge
```

---

# Public API

```ts
interface Suggestions {
  readonly registry: SuggestionRegistry;

  readonly lifecycle: SuggestionLifecycle;
}
```

---

# Supported Suggestion Services

Suggestions

- Create
- Update
- Accept
- Reject
- Withdraw

Status

- Pending
- Accepted
- Rejected
- Withdrawn

Lifecycle

- Proposed
- Reviewed
- Completed

Future

- AI Suggestions
- Batch Suggestions
- Smart Merge
- Semantic Suggestions

---

# Dependency

Depends On

- TASK-005 — Collaboration User
- TASK-006 — Shared Document
- TASK-011 — Comments

---

# Risk

Medium

Suggestions becomes the standardized proposed-change abstraction across the Atlas Editor collaboration ecosystem.

---

# Files Allowed

```text
atlas-collaboration/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] Suggestions implemented.
- [ ] Supports suggestion lifecycle.
- [ ] Supports suggestion status.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Editor exposes reusable suggestion abstractions capable of representing proposed document changes independently from rendering, synchronization, networking, and storage implementations.

---

# AI Constraints

Before implementation

- Do not modify documents.
- Do not implement synchronization.
- Do not implement rendering.
- Do not implement networking.
- Do not implement UI.
- Focus only on Suggestions abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-005-collaboration-user.md
- TASK-006-shared-document.md
- TASK-011-comments.md

---

# Next Task

TASK-013-review.md
