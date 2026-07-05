# Architecture

`@atlas/atlas-collaboration` is a headless collaboration contract package.

Rules:

- Provider independent.
- Transport agnostic.
- Renderer agnostic.
- Storage agnostic.
- Synchronization algorithm agnostic.

```text
Collaboration Core
  -> Session
  -> Presence
  -> Awareness
  -> Shared Document
  -> Synchronization
  -> Workflow
  -> Permissions
  -> Events
  -> History
```
