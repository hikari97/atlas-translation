# ADR-0001

# Use Monorepo

Status

Accepted

Date

2026-07-01

---

# Context

Atlas Studio consists of multiple reusable packages.

Examples include:

- atlas-types
- atlas-document
- atlas-command
- atlas-events
- atlas-core

These packages share a common release cycle and depend on one another.

Managing them in separate repositories would increase maintenance complexity.

---

# Decision

Atlas Studio will use a single monorepo.

Packages remain independent but are developed together.

Shared tooling includes:

- pnpm workspaces
- Turbo
- TypeScript Project References

---

# Consequences

Positive

- Shared versioning
- Easier refactoring
- Faster development
- Centralized CI/CD
- Shared tooling

Negative

- Larger repository
- More complex build pipeline

---

# Alternatives Considered

Separate repositories

Rejected because dependency management becomes more difficult.

---

# References

PACKAGE_DEPENDENCY_GRAPH.md

MONOREPO_STRUCTURE.md
