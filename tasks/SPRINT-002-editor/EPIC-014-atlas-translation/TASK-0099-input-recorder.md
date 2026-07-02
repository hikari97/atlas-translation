---
id: TASK-0099

title: Implement InputRecorder

status: Ready

priority: Medium

story_points: 13

sprint: SPRINT-011-input-system

epic: EPIC-014

package: atlas-input

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0099 — Implement InputRecorder

## Summary

Implement `InputRecorder`.

InputRecorder records platform-independent input events into replayable input sessions.

Recorded sessions can be used for automation, testing, macro execution, and diagnostics.

InputRecorder never executes recorded events.

---

# Capability

After this task is complete, Atlas Studio can capture deterministic input sessions.

---

# Goal

Provide reusable input recording.

---

# Business Value

Supports:

- Macro recording
- Macro playback
- Automated testing
- Bug reproduction
- User session replay
- Future collaborative diagnostics

---

# Background

Recording user input is more stable than recording editor state changes.

InputRecorder captures normalized InputEvents together with timing information.

---

# Scope

## Included

- Recording lifecycle
- Session metadata
- Event recording
- Timing information

## Excluded

- Playback
- Browser recording
- Video recording
- Command execution

---

# Deliverables

```text
packages/
└── atlas-input/
    └── src/
        ├── InputRecorder.ts
        ├── InputRecording.ts
        ├── InputRecordingSession.ts
        └── index.ts
```

---

# Responsibilities

InputRecorder is responsible for:

- recording InputEvents
- recording timestamps
- creating replayable sessions
- exporting immutable recordings

InputRecorder is NOT responsible for:

- replay
- rendering
- executing commands
- browser APIs

---

# Architecture

```text
InputManager

↓

InputRuntimeEvent

↓

InputRecorder

↓

InputRecordingSession
```

---

# Public API

```ts
interface InputRecorder {
  start(): void;

  stop(): InputRecordingSession;

  record(event: InputEvent): void;
}
```

---

# Recorded Data

Supports recording:

- Pointer events
- Keyboard events
- Gesture events
- Shortcut events
- Timing metadata

---

# Dependency

Depends On

- TASK-0091 — InputEvent
- TASK-0098 — InputRuntimeEvent

---

# Risk

Medium

InputRecorder provides deterministic input capture for automation and diagnostics.

---

# Files Allowed

```text
packages/atlas-input/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-project/**
```

---

# Acceptance Criteria

- [ ] InputRecorder implemented.
- [ ] Supports recording lifecycle.
- [ ] Produces immutable recording sessions.
- [ ] Serializable.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Studio can record deterministic input sessions independently from platform APIs.

---

# AI Constraints

Before implementation:

- Do not implement playback.
- Do not implement browser recording.
- Do not implement video recording.
- Focus only on input recording.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0091-input-event.md
- TASK-0098-input-events.md

---

# Next Task

TASK-0100-input-playback.md
