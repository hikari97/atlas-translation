# atlas-editor

Atlas Editor is the central orchestration package of Atlas Studio.

It coordinates every editing operation by integrating the document model, renderer, input system, history manager, selection manager, command framework, plugin system, and future editor services into a single deterministic editing runtime.

The package does **not** implement rendering, document storage, input processing, history management, or plugin execution directly. Instead, it provides the high-level editing workflow that composes those independent subsystems into one cohesive editor.

---

# Goals

The primary goals of atlas-editor are:

- Provide a deterministic editing runtime.
- Coordinate all editor subsystems.
- Maintain a stable editor lifecycle.
- Support multiple documents.
- Support multiple workspaces.
- Support collaborative editing.
- Support plugin extensions.
- Preserve platform independence.

---

# Responsibilities

atlas-editor is responsible for:

- Editor lifecycle
- Workspace lifecycle
- Active document management
- Tool coordination
- Mode switching
- Command coordination
- Selection coordination
- History coordination
- Renderer coordination
- Input coordination
- Plugin coordination
- Runtime state

atlas-editor is **not** responsible for:

- Rendering graphics
- Storing documents
- Undo/Redo implementation
- Event dispatching
- Input normalization
- Plugin loading
- Window management

---

# Architecture

```text
Application

↓

Editor

↓

Workspace

↓

Document

↓

Selection
History
Renderer
Input
Commands
Plugins
```

---

# Dependencies

atlas-editor depends on:

- atlas-types
- atlas-document
- atlas-command
- atlas-events
- atlas-core
- atlas-plugin
- atlas-renderer
- atlas-ui
- atlas-interaction
- atlas-selection
- atlas-history
- atlas-input

---

# Public Components

The package will expose:

- Editor
- EditorManager
- EditorContext
- EditorState
- WorkspaceManager
- WorkspaceContext
- ActiveDocument
- ActiveTool
- EditorMode
- EditorSession
- EditorConfiguration

Additional components may be introduced without breaking existing APIs.

---

# Design Principles

Every public API should be:

- Deterministic
- Immutable where appropriate
- Strongly typed
- Framework independent
- Extensible
- Testable
- Thread-safe where applicable

---

# Package Structure

```text
packages/
└── atlas-editor/
    ├── src/
    ├── tests/
    ├── docs/
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

---

# Sprint Structure

Sprint 1 — Foundation

- Editor
- Editor Manager
- Editor State
- Editor Context
- Editor Lifecycle

Sprint 2 — Workspace

- Workspace
- Workspace Manager
- Workspace State
- Workspace Context
- Workspace Lifecycle

Sprint 3 — Documents

- Active Document
- Document Switching
- Document Sessions
- Multi Document
- Document Context

Sprint 4 — Tools

- Tool Manager
- Active Tool
- Tool Context
- Tool State
- Tool Registry

Sprint 5 — Modes

- Editor Mode
- Mode Manager
- Mode Switching
- Mode Context
- Mode Registry

Sprint 6 — Sessions

- Editor Session
- Session Manager
- Session Snapshot
- Session Restore
- Session Configuration

Sprint 7 — Integration

- History Integration
- Input Integration
- Renderer Integration
- Selection Integration
- Plugin Integration

Sprint 8 — Performance

- Runtime Metrics
- Diagnostics
- Optimization
- Benchmark
- Documentation

---

# Expected Outputs

- Stable editor runtime.
- Deterministic lifecycle.
- Framework-independent APIs.
- Plugin-ready architecture.
- Multi-document support.
- Extensible editor foundation.

---

# References

- CONSTITUTION.md
- DECISIONS.md
- DO_NOT_BREAK.md
- docs/specification/PROJECT.md
- docs/specification/WORKSPACE.md
- EPIC.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
