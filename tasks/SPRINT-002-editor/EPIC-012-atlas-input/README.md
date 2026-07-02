# Atlas Studio

# atlas-input

> Unified, deterministic, and framework-independent input abstraction for Atlas Studio.

---

# Overview

`atlas-input` is the input subsystem of Atlas Studio.

It provides a unified abstraction layer responsible for receiving, normalizing, routing, and managing every user interaction before higher-level systems consume it.

The package separates physical input devices from application behavior, allowing editors, plugins, renderers, and tools to consume a consistent input model regardless of the underlying platform.

Rather than depending directly on browser events, operating system APIs, or framework-specific event systems, every interaction flows through atlas-input.

---

# Goals

The package is designed to provide:

- Framework-independent input management
- Unified keyboard abstraction
- Unified pointer abstraction
- Gesture recognition
- Shortcut management
- Configurable input mapping
- Deterministic event routing
- Extensible input providers
- Accessibility support
- High-performance event processing

---

# Non Goals

This package is **not** responsible for:

- Rendering
- Document editing
- Command execution
- History management
- UI widgets
- Viewport rendering
- Layout calculation
- Business logic

These responsibilities belong to other Atlas Studio packages.

---

# Design Principles

atlas-input follows the core Atlas Studio architecture principles.

## Framework Independent

No dependency on:

- React
- Vue
- Angular
- Electron
- Browser APIs
- DOM APIs

Framework adapters should exist outside this package.

---

## Immutable

Input events are immutable after creation.

Consumers should never mutate input objects.

---

## Deterministic

The same sequence of input events should always produce the same routing results.

---

## Strongly Typed

Every public API must expose complete TypeScript types.

No `any` should appear in public interfaces.

---

## Extensible

Applications may register:

- New devices
- Gesture recognizers
- Shortcut providers
- Event filters
- Input mappers
- Plugin-defined input sources

without modifying atlas-input itself.

---

# Package Architecture

```text
Physical Devices

↓

Platform Adapter

↓

Input Manager

↓

Device Managers

↓

Input Router

↓

Input Mapping

↓

Shortcut Manager

↓

Consumers
```

---

# Supported Input Devices

The package supports:

- Keyboard
- Mouse
- Trackpad
- Touch
- Stylus
- Pen
- Wheel
- Gamepad (future)
- Accessibility devices
- Plugin-defined devices

---

# Main Components

The package is divided into several subsystems.

## Foundation

Responsible for:

- Input Manager
- Input Device
- Input Router
- Input Context
- Input State

---

## Keyboard

Responsible for:

- Keyboard Manager
- Keyboard State
- Key Mapping
- Modifier Keys
- Keyboard Events

---

## Pointer

Responsible for:

- Pointer Manager
- Mouse
- Stylus
- Touch Pointer
- Wheel Events

---

## Gesture

Responsible for:

- Pan
- Drag
- Pinch
- Rotate
- Tap
- Double Tap
- Long Press

---

## Shortcuts

Responsible for:

- Keyboard shortcuts
- Chord shortcuts
- Context shortcuts
- Shortcut scopes
- Shortcut conflicts

---

## Input Mapping

Responsible for:

- Logical actions
- Device-independent mapping
- Context-sensitive mapping
- Input profiles
- User customization

---

## Events

Responsible for:

- Input Events
- Event Dispatcher
- Event Listeners
- Event Filters
- Event Propagation

---

## Performance

Responsible for:

- Metrics
- Profiling
- Event batching
- Input buffering
- Benchmarks

---

# Dependencies

atlas-input depends on:

- atlas-core
- atlas-utils

Future optional integrations:

- atlas-editor
- atlas-renderer
- atlas-history
- atlas-selection

---

# Package Structure

```text
packages/

atlas-input/

├── README.md
├── EPIC.md
├── IMPLEMENTATION_PLAN.md
├── TASK_INDEX.md
│
├── src/
│   ├── manager/
│   ├── keyboard/
│   ├── pointer/
│   ├── gesture/
│   ├── shortcut/
│   ├── mapping/
│   ├── events/
│   └── performance/
│
└── tasks/
```

---

# Sprint Overview

Sprint 1

- Foundation

Sprint 2

- Keyboard

Sprint 3

- Pointer

Sprint 4

- Gesture

Sprint 5

- Shortcuts

Sprint 6

- Input Mapping

Sprint 7

- Events

Sprint 8

- Performance

---

# Development Philosophy

Each subsystem should:

- be independently testable
- expose immutable APIs
- avoid framework dependencies
- support plugin extensions
- preserve deterministic behavior

---

# Coding Standards

The implementation must:

- support strict TypeScript
- avoid circular dependencies
- avoid mutable shared state
- expose stable public APIs
- maintain backward compatibility

---

# Accessibility

atlas-input must support:

- keyboard-only navigation
- screen readers
- assistive devices
- high contrast environments
- alternative input hardware

Accessibility should remain a first-class design requirement.

---

# Performance Goals

The package should:

- minimize allocations
- minimize latency
- avoid unnecessary event duplication
- support event batching
- scale to high-frequency input devices

---

# Deliverables

This Epic delivers:

- 8 implementation sprints
- 40 implementation tasks
- complete public API
- framework-independent architecture
- production-ready package foundation

---

# Status

Current Status

```text
Progress

Sprint 1 □□□□□
Sprint 2 □□□□□
Sprint 3 □□□□□
Sprint 4 □□□□□
Sprint 5 □□□□□
Sprint 6 □□□□□
Sprint 7 □□□□□
Sprint 8 □□□□□

0 / 40 Tasks Completed
```
