# Package Lifecycle

> **Status:** Draft
>
> **Version:** 1.0.0
>
> **Last Updated:** 2026-07-01

---

# Purpose

This document defines the official lifecycle of every package in the Atlas Studio monorepo.

Every package must follow the same lifecycle from planning to deprecation.

The objective is to ensure consistency, maintainability, and predictable development across the entire project.

---

# Lifecycle Overview

```text
                 Idea
                  │
                  ▼
              Planning
                  │
                  ▼
            Architecture
                  │
                  ▼
          Implementation
                  │
                  ▼
               Testing
                  │
                  ▼
               Review
                  │
                  ▼
               Release
                  │
                  ▼
             Maintenance
                  │
                  ▼
             Deprecation
```

---

# Stage 1 — Idea

Purpose

Capture an idea before any implementation begins.

Activities

- Identify the problem
- Define objectives
- Evaluate feasibility
- Record assumptions

Deliverables

- Product proposal
- Feature request
- Initial notes

Exit Criteria

- Idea approved

---

# Stage 2 — Planning

Purpose

Transform ideas into actionable work.

Activities

- Create roadmap
- Create sprint
- Define epics
- Define tasks
- Estimate effort

Deliverables

- ROADMAP.md
- Sprint documents
- Epic documents
- Task documents

Exit Criteria

- Planning approved

---

# Stage 3 — Architecture

Purpose

Design the package before implementation.

Activities

- Package responsibility
- Dependency analysis
- Public API design
- Folder structure
- Technical decisions

Deliverables

- Architecture documents
- ADRs
- Package specification

Exit Criteria

- Architecture approved

---

# Stage 4 — Implementation

Purpose

Build the package.

Activities

- Source code
- Unit implementation
- Public API
- Internal modules

Deliverables

- Source code
- Tests
- Build configuration

Exit Criteria

- Feature complete

---

# Stage 5 — Testing

Purpose

Verify correctness.

Activities

- Unit tests
- Integration tests
- API verification
- TypeScript validation
- Build verification

Deliverables

- Test suite
- Coverage report
- Validation report

Exit Criteria

- All tests pass

---

# Stage 6 — Review

Purpose

Ensure engineering quality.

Activities

- Code review
- Architecture review
- Documentation review
- Dependency review

Deliverables

- Review report
- Approval

Exit Criteria

- Review approved

---

# Stage 7 — Release

Purpose

Publish a stable version.

Activities

- Version assignment
- Changelog update
- Release notes
- Package publishing

Deliverables

- Package release
- Git tag
- Release notes

Exit Criteria

- Package published

---

# Stage 8 — Maintenance

Purpose

Support released packages.

Activities

- Bug fixes
- Performance improvements
- Security updates
- Documentation updates

Deliverables

- Patch releases
- Minor releases

Exit Criteria

- Next major version planned

---

# Stage 9 — Deprecation

Purpose

Safely retire a package.

Activities

- Announce deprecation
- Provide migration guide
- Freeze features
- Remove support

Deliverables

- Deprecation notice
- Migration guide

Exit Criteria

- Package archived

---

# Lifecycle Gates

A package may not move to the next stage until the previous stage is approved.

```text
Planning
    │
    ▼
Architecture
    │
    ▼
Implementation
    │
    ▼
Testing
    │
    ▼
Review
    │
    ▼
Release
```

---

# Required Documents

Every package must provide:

```text
README.md

ARCHITECTURE.md

API.md

CHANGELOG.md

CONTRIBUTING.md
```

---

# Required Quality Gates

Before Release:

- Planning approved
- Architecture approved
- Tasks completed
- Tests passing
- Documentation complete
- Public API reviewed
- Dependencies reviewed
- No critical issues

---

# Definition of Done

A package is considered complete only when:

- All planned tasks are finished.
- Documentation is complete.
- Public API is stable.
- Tests pass successfully.
- Engineering review is approved.
- Release artifacts are prepared.

---

# Lifecycle Responsibilities

| Stage          | Primary Owner      |
| -------------- | ------------------ |
| Idea           | Product Owner      |
| Planning       | Tech Lead          |
| Architecture   | Software Architect |
| Implementation | Developer / AI     |
| Testing        | QA Engineer        |
| Review         | Tech Lead          |
| Release        | Release Manager    |
| Maintenance    | Package Owner      |
| Deprecation    | Architecture Team  |

---

# AI Development Policy

AI tools (Codex, ChatGPT, etc.) must follow the lifecycle.

AI must not:

- Skip planning.
- Skip architecture.
- Implement undocumented features.
- Modify approved architecture without an ADR.

---

# Summary

Every Atlas Studio package follows the same lifecycle.

Following this lifecycle ensures:

- Consistent quality
- Predictable releases
- Easier maintenance
- Better collaboration
- Stable architecture
