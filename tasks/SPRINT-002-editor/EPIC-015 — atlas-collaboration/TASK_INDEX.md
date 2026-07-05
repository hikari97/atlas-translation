# EPIC-015 — atlas-collaboration

## Overview

Atlas Collaboration provides the provider-independent collaboration foundation for the Atlas Editor ecosystem.

The package standardizes collaborative editing abstractions including collaboration sessions, participant awareness, synchronization, review workflows, comments, suggestions, annotations, permissions, shared clipboard, and collaboration history while remaining independent from networking protocols, synchronization algorithms, storage providers, and collaboration vendors.

---

## Status

Sprint

- SPRINT-002 Editor

Epic

- EPIC-015 atlas-collaboration

Status

- Completed

Priority

- Critical

Story Points

- 356

---

# Tasks

| ID       | Task                          | Status |
| -------- | ----------------------------- | ------ |
| TASK-001 | Collaboration Core            | Done   |
| TASK-002 | Collaboration Session         | Done   |
| TASK-003 | Presence                      | Done   |
| TASK-004 | Awareness                     | Done   |
| TASK-005 | Collaboration User            | Done   |
| TASK-006 | Shared Document               | Done   |
| TASK-007 | Collaboration Synchronization | Done   |
| TASK-008 | Conflict Resolution           | Done   |
| TASK-009 | Remote Cursor                 | Done   |
| TASK-010 | Remote Selection              | Done   |
| TASK-011 | Comments                      | Done   |
| TASK-012 | Suggestions                   | Done   |
| TASK-013 | Review                        | Done   |
| TASK-014 | Annotation                    | Done   |
| TASK-015 | Shared Clipboard              | Done   |
| TASK-016 | Follow User                   | Done   |
| TASK-017 | Collaboration Permissions     | Done   |
| TASK-018 | Collaboration Events          | Done   |
| TASK-019 | Collaboration History         | Done   |

---

# Dependency Graph

```text
Core
    ↓
Session
    ↓
Presence
    ↓
Awareness
    ↓
Collaboration User
    ↓
Shared Document
    ↓
Synchronization
    ↓
Conflict Resolution
    ↓
Remote Cursor
    ↓
Remote Selection
    ↓
Comments
    ↓
Suggestions
    ↓
Review
    ↓
Annotation
    ↓
Shared Clipboard
    ↓
Follow User
    ↓
Collaboration Permissions
    ↓
Collaboration Events
    ↓
Collaboration History
```

---

# Deliverables

- Collaboration Foundation
- Session Management
- Presence
- Awareness
- Shared Document
- Synchronization Abstraction
- Conflict Resolution
- Remote Collaboration
- Review Workflow
- Annotation
- Shared Clipboard
- Collaboration Permission Model
- Collaboration Domain Events
- Collaboration History

---

# Next Epic

EPIC-016

---

# Completion Summary

Status: Completed

Implementation:

- `packages/atlas-collaboration`

Completed scope:

- 18 physical task files completed.
- 19 indexed tasks completed.
- `TASK-016 — Follow User` is listed in this index but does not have a standalone task file; it is represented by the public `FollowUser` contract.

Validation completed:

- `npm run typecheck`
- `npm run test:types`
- `npm run build`
- task API coverage audit
- forbidden `any` scan
- provider/transport implementation scan
- internal package import scan
