---
id: TASK-0184

title: Implement AIToolCalling

status: Completed

priority: Critical

story_points: 21

sprint: SPRINT-020-ai-runtime-extensions

epic: EPIC-016

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0184 — Implement AIToolCalling

## Summary

Implement `AIToolCalling`.

AIToolCalling provides a provider-independent abstraction for discovering, validating, invoking, and coordinating executable tools requested during AI inference.

It enables AI models to interact with Atlas Translation Platform capabilities without coupling inference logic to tool implementations.

---

# Capability

After this task is complete, Atlas Translation Platform can execute AI-requested tools through a standardized runtime.

---

# Goal

Provide reusable AI tool execution.

---

# Business Value

Supports

- Translation tools
- OCR tools
- Cloud tools
- Project tools
- Plugin tools
- Future Agent workflows

without modifying AIProviders.

---

# Background

Modern AI systems increasingly rely on external tools to perform deterministic tasks.

AIToolCalling separates tool execution from inference while remaining provider independent.

---

# Scope

## Included

- Tool registration
- Tool discovery
- Tool validation
- Tool invocation
- Tool execution metadata

## Excluded

- Agent orchestration
- Safety policy
- Plugin implementation
- UI

---

# Deliverables

```text
atlas-translation/

AIToolCalling.ts

AITool.ts

AIToolDefinition.ts

AIToolInvocation.ts

AIToolResult.ts

index.ts
```

---

# Responsibilities

AIToolCalling is responsible for

- registering tools
- discovering tools
- validating invocations
- executing tools
- exposing execution metadata

AIToolCalling is NOT responsible for

- inference execution
- provider implementation
- agent reasoning
- UI

---

# Architecture

```text
AIInference

↓

AIToolCalling

↓

AITool

↓

Atlas Service

↓

AIToolResult
```

---

# Public API

```ts
interface AIToolCalling {
  register(tool: AITool): void;

  invoke(invocation: AIToolInvocation): Promise<AIToolResult>;
}
```

---

# Supported Tool Types

Internal

- Translation
- OCR
- Project
- Asset
- Cloud

External

- Plugin Tool
- HTTP Tool
- Script Tool

Future

- MCP Tool
- Agent Tool

---

# Dependency

Depends On

- TASK-0103 — PluginManager
- TASK-0172 — AIManager

---

# Risk

High

AIToolCalling becomes the execution layer for every AI-assisted workflow inside Atlas Translation Platform.

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

- [ ] AIToolCalling implemented.
- [ ] Supports tool registration.
- [ ] Supports tool invocation.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform executes AI-requested tools through a reusable AIToolCalling abstraction.

---

# AI Constraints

Before implementation

- Do not implement Agent orchestration.
- Do not implement provider-specific function calling.
- Do not implement Safety policies.
- Focus only on the AIToolCalling abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0103-plugin-manager.md
- TASK-0172-ai-manager.md

---

# Next Task

TASK-0185-ai-safety-pipeline.md
