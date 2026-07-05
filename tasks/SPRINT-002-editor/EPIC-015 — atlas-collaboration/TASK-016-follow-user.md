---
id: TASK-016

title: Implement FollowUser

status: Completed

priority: Medium

story_points: 13

sprint: SPRINT-002-editor

epic: EPIC-015

package: atlas-collaboration

owner: H.Makki

reviewer:

created_at: 2026-07-03

updated_at: 2026-07-04
---

# TASK-016 — Implement FollowUser

## Summary

Implement `FollowUser`.

FollowUser provides the provider-independent abstraction that allows one collaborator to follow another collaborator's viewport or editing focus without depending on UI, rendering, transport, or synchronization providers.

---

# Scope

## Included

- Follow user contract
- Follower reference
- Target user reference
- Enabled state
- Metadata

## Excluded

- Viewport rendering
- Camera movement
- Networking
- UI
- Provider implementation

---

# Deliverables

```text
atlas-collaboration/

FollowUser.ts

FollowUserMetadata.ts

index.ts
```

---

# Public API

```ts
interface FollowUser {
  readonly followerId: CollaborationUserId;
  readonly targetId: CollaborationUserId;
  readonly enabled: boolean;
  readonly metadata: JsonObject;
}
```

---

# Definition of Done

- FollowUser contract is public.
- Contract is provider independent.
- Contract does not depend on renderer or transport implementation.
- TypeScript strict mode passes.
