---
title: Tasks
description: Atlas Studio Development Workflow
version: 1.0
status: Stable
owner: H.Makki
last_updated: 2026-07-01
---

---

# Tasks

## Overview

The `tasks` directory contains all development work planned for Atlas Studio.

Every feature, bug fix, refactoring effort, research activity, and documentation update must be tracked through a task.

No implementation should begin without a corresponding task.

---

# Goals

The task system exists to:

- Organize development work
- Define clear implementation goals
- Improve collaboration
- Support AI-assisted development
- Maintain project history
- Track engineering progress

---

# Principles

Every task should be:

- Small
- Independent
- Testable
- Reviewable
- Traceable

Tasks should focus on a single responsibility.

---

# Directory Structure

```text
tasks/

README.md

backlog/

sprint-001/
sprint-002/
sprint-003/

done/

templates/
```

---

# Workflow

Development follows the workflow below.

```text
Idea
    ↓
Backlog
    ↓
Sprint Planning
    ↓
Epic
    ↓
Task
    ↓
Implementation
    ↓
Code Review
    ↓
Testing
    ↓
Merge
    ↓
Done
```

---

# Backlog

The `backlog` directory contains all ideas and planned work that has not yet been scheduled.

Examples:

- New Features
- Improvements
- Research
- Technical Debt

Items in the backlog are not ready for implementation.

---

# Sprint

A sprint is a collection of related work completed within a defined period.

Each sprint should have its own directory.

Example:

```text
sprint-001/

README.md

EPIC-001/
EPIC-002/
EPIC-003/
```

---

# Sprint README

Every sprint must include a README describing:

- Sprint Goal
- Sprint Scope
- Deliverables
- Included Epics
- Timeline
- Completion Criteria

---

# Epic

An Epic groups related tasks.

Example:

```text
EPIC-001

Atlas Types
```

Example contents:

```text
README.md

TASK-0001.md

TASK-0002.md

TASK-0003.md
```

---

# Epic README

Every Epic should describe:

- Purpose
- Scope
- Dependencies
- Deliverables
- Acceptance Criteria
- Related Documents

---

# Task

A Task is the smallest unit of implementation.

Every Task should produce a measurable outcome.

---

# Task Naming

Use sequential identifiers.

Example:

```text
TASK-0001.md
TASK-0002.md
TASK-0003.md
```

Task IDs must never be reused.

---

# Task Template

Each task should contain the following sections.

```markdown
# Title

## Goal

## Background

## Requirements

## Deliverables

## Technical Notes

## Acceptance Criteria

## Files Allowed

## Files Forbidden

## Testing

## References
```

---

# Task Lifecycle

Every task follows the same lifecycle.

```text
Draft
    ↓
Ready
    ↓
In Progress
    ↓
Review
    ↓
Completed
```

Tasks should not skip stages.

---

# Definition of Ready

A task is ready when:

- Requirements are complete.
- Scope is defined.
- Dependencies are identified.
- Acceptance criteria exist.

---

# Definition of Done

A task is complete only if:

- Implementation finished.
- Build successful.
- TypeScript passes.
- Lint passes.
- Tests pass (if applicable).
- Documentation updated.
- Code reviewed.
- Approved for merge.

---

# Review Checklist

Every implementation should be reviewed for:

- Architecture
- Maintainability
- Performance
- Security
- Type Safety
- Error Handling
- Documentation
- Testing

---

# Priority Levels

Tasks may have one of the following priorities.

| Priority | Description                 |
| -------- | --------------------------- |
| Critical | Blocks development          |
| High     | Required for current sprint |
| Medium   | Planned work                |
| Low      | Nice to have                |

---

# Estimation

Estimated effort should use simple story points.

| Points | Complexity |
| ------ | ---------- |
| 1      | Very Small |
| 2      | Small      |
| 3      | Medium     |
| 5      | Large      |
| 8      | Very Large |

---

# AI Development Workflow

Atlas Studio supports AI-assisted development.

Before implementing a task, AI coding assistants should read:

1. README.md
2. docs/README.md
3. AGENTS.md
4. CONTEXT.md
5. CONSTITUTION.md
6. Relevant Task

AI should only modify files listed under **Files Allowed**.

---

# Branch Naming

Recommended branch naming.

```text
feature/task-0001-atlas-types

feature/task-0002-document-reader

fix/task-0104-memory-leak

refactor/task-0201-command-system
```

---

# Commit Messages

Recommended format.

```text
feat(types): create workspace interfaces

fix(document): resolve migration issue

refactor(core): simplify command execution

docs(api): update authentication guide
```

---

# Sprint Completion

A sprint is complete when:

- All planned tasks are completed.
- All reviews are approved.
- Documentation is updated.
- Build passes.
- Release notes are prepared.

---

# Done

Completed work should be moved to the `done` directory for historical reference.

Tasks inside `done` should never be modified except to correct documentation errors.

---

# AI Context

AI coding assistants should treat task documents as implementation contracts.

Rules:

- Do not implement features without a task.
- Follow the task requirements exactly.
- Respect "Files Allowed" and "Files Forbidden".
- Do not expand task scope.
- If requirements are unclear, stop and request clarification.

---

# Related Documents

- ../README.md
- ../docs/README.md
- ../docs/07-development/
- ../AGENTS.md
- ../CONSTITUTION.md

---

Tasks are the foundation of Atlas Studio's engineering workflow.

Every line of production code should be traceable back to a documented task.
