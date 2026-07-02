# 🚀 START HERE

Welcome to the Atlas Studio repository.

Before making any changes, read the project documentation in the following order.

---

# Step 1 — Project Constitution

Read first.

```
CONSTITUTION.md
```

This document defines the non-negotiable principles of the project.

---

# Step 2 — Project Rules

Read the project rules.

```
DO_NOT_BREAK.md

NON_GOALS.md

DECISIONS.md
```

These documents define project constraints and important decisions.

---

# Step 3 — Architecture

Read the architecture handbook.

```
docs/

01-architecture/
```

Read in this order:

```
PACKAGE_DEPENDENCY_GRAPH.md

MONOREPO_STRUCTURE.md

PACKAGE_LIFECYCLE.md

CODING_STANDARDS.md

NAMING_CONVENTIONS.md

DESIGN_PRINCIPLES.md

ADR/
```

Architecture is authoritative.

Never implement features that violate the architecture.

---

# Step 4 — Project Roadmap

Read:

```
tasks/

ROADMAP.md
```

Understand:

- Sprints
- Epics
- Tasks

Never implement work outside the roadmap.

---

# Step 5 — Current Work

Read:

```
tasks/

PROJECT_STATUS.md

CURRENT_CONTEXT.md

CURRENT_TASK.md
```

These files describe the current implementation state.

Always implement the current task only.

---

# Step 6 — Implementation Rules

Read:

```
tasks/

IMPLEMENTATION_RULES.md
```

These rules define how implementation must be performed.

---

# Step 7 — Begin Implementation

Only after completing all previous steps.

Implement only the task specified in:

```
task/CURRENT_TASK.md
```

Do not continue to the next task automatically.

Stop after the task is complete.

---

# Implementation Workflow

```
Read START_HERE.md

↓

Read Constitution

↓

Read Architecture

↓

Read Roadmap

↓

Read Current Task

↓

Implement ONE task

↓

Run Tests

↓

Update Documentation (if required)

↓

Stop
```

---

# Repository Structure

```
apps/
packages/
plugins/
schemas/
shared/
docs/
tasks/
tooling/
```

Every directory has a single responsibility.

Do not move files unless explicitly required by the current task.

---

# Rules

Always:

- Follow the Constitution.
- Follow ADRs.
- Follow Coding Standards.
- Respect package boundaries.
- Respect public APIs.
- Use TypeScript strict mode.
- Keep changes minimal and focused.

Never:

- Modify unrelated packages.
- Skip tasks.
- Implement future tasks.
- Change architecture without an approved ADR.
- Import internal modules from another package.

---

# Definition of Success

A successful implementation:

- Completes only the current task.
- Passes all tests.
- Preserves architecture.
- Keeps the codebase consistent.
- Stops after the task is complete.

---

Welcome to Atlas Studio.

Build carefully.
