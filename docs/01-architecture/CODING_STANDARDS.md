# Coding Standards

> **Status:** Draft
>
> **Version:** 1.0.0
>
> **Last Updated:** 2026-07-01

---

# Purpose

This document defines the official coding standards for Atlas Studio.

Every package must follow these standards to ensure consistency, readability, maintainability, and long-term scalability.

These standards apply to:

- Developers
- AI Coding Assistants
- Code Generators
- Contributors

---

# Core Principles

Code should be:

- Simple
- Predictable
- Readable
- Testable
- Maintainable
- Explicit
- Type-safe

Always prefer clarity over cleverness.

---

# TypeScript

Always enable:

- strict
- noImplicitAny
- strictNullChecks
- noUncheckedIndexedAccess
- exactOptionalPropertyTypes

Never disable strict mode.

---

# File Naming

Use PascalCase for classes.

```
ProjectDocument.ts

BubbleDocument.ts

DocumentCollection.ts
```

Use camelCase for helper functions.

```
createDocument.ts

normalizeText.ts
```

Never use spaces.

Never use uppercase snake case for filenames.

---

# Folder Naming

Always use kebab-case.

```
atlas-document/

atlas-command/

google-translate/

bubble-detector/
```

---

# Variable Naming

Good

```ts
project;

page;

bubble;

documentCollection;
```

Bad

```ts
a;

temp;

tmp1;

obj;

data2;
```

Names must describe intent.

---

# Class Naming

Always use PascalCase.

```
AtlasDocument

ProjectDocument

DocumentTraverser

SnapshotFactory
```

---

# Interface Naming

Do NOT prefix with "I".

Good

```ts
DocumentVisitor;

Serializer;

Snapshot;
```

Bad

```ts
IDocument;

IVisitor;

ISerializer;
```

Interfaces represent contracts.

---

# Enum Naming

Use PascalCase.

```ts
DocumentState;

LayerType;

CommandStatus;
```

Members use PascalCase.

```ts
Ready;

Running;

Completed;
```

---

# Constant Naming

Global constants use:

```ts
MAX_PAGE_SIZE;

DEFAULT_TIMEOUT;

API_VERSION;
```

---

# Function Naming

Functions should describe actions.

Good

```ts
createDocument();

removePage();

addBubble();

findProject();
```

Bad

```ts
doThing();

run();

execute();

process();
```

---

# Boolean Naming

Always use positive names.

```ts
isVisible;

isDeleted;

hasChildren;

canUndo;
```

Avoid:

```ts
notVisible;

disable;

invalid;
```

---

# Method Ordering

Inside classes:

```text
Static Properties

↓

Constructor

↓

Public Methods

↓

Protected Methods

↓

Private Methods
```

Keep the order consistent.

---

# Import Order

```ts
// Node

// Third-party

// Internal packages

// Relative imports

// Types
```

Example

```ts
import path from 'node:path';

import { nanoid } from 'nanoid';

import { AtlasDocument } from '@atlas/document';

import { createNode } from './utils';

import type { Project } from '@atlas/types';
```

---

# Export Rules

Prefer named exports.

Good

```ts
export class ProjectDocument {}
```

Avoid

```ts
export default ProjectDocument;
```

---

# Barrel Exports

Each directory exposes:

```
index.ts
```

Only public APIs are exported.

Internal modules remain private.

---

# Error Handling

Throw meaningful errors.

Good

```ts
throw new Error('Project not found.');
```

Bad

```ts
throw 'error';
```

Never swallow exceptions.

---

# Async Code

Always use async/await.

Good

```ts
await repository.save(document);
```

Avoid nested Promise chains.

---

# Null Handling

Prefer:

```ts
value ?? defaultValue;
```

Avoid:

```ts
value || defaultValue;
```

when nullish values are expected.

---

# Immutability

Prefer immutable objects.

Avoid mutating external state.

Collections should expose read-only views.

---

# Comments

Comments explain **why**, not **what**.

Good

```ts
// Preserve insertion order for deterministic serialization.
```

Bad

```ts
// Increment i
i++;
```

---

# JSDoc

Public APIs should include documentation.

```ts
/**
 * Adds a page to the project.
 */
```

Private methods usually do not require JSDoc.

---

# Logging

Do not use:

```ts
console.log();
```

inside library code.

Use a logging abstraction if logging is required.

---

# Magic Numbers

Avoid

```ts
if (timeout > 5000)
```

Prefer

```ts
const DEFAULT_TIMEOUT = 5000;
```

---

# Code Duplication

Duplicate logic should be extracted.

Never copy large code blocks.

---

# Dependency Injection

Prefer constructor injection.

Good

```ts
new ProjectService(repository);
```

Avoid global singletons.

---

# Testing

Every public feature should have tests.

Prefer:

- Unit tests
- Integration tests

Avoid testing private methods directly.

---

# Performance

Do not optimize prematurely.

Optimize only after profiling.

Prefer readable code over micro-optimizations.

---

# AI Coding Rules

AI must:

- Follow package boundaries.
- Respect public APIs.
- Avoid introducing new dependencies.
- Avoid changing architecture without an ADR.
- Keep changes focused on the current task.

AI must not:

- Modify unrelated files.
- Introduce breaking changes without approval.
- Bypass TypeScript strict mode.
- Skip tests for public functionality.

---

# Code Review Checklist

Before submitting code:

- [ ] Builds successfully.
- [ ] TypeScript strict passes.
- [ ] Tests added or updated.
- [ ] Public API unchanged (or documented).
- [ ] Documentation updated.
- [ ] No circular dependencies.
- [ ] No dead code.
- [ ] No TODO left behind.
- [ ] Naming follows conventions.

---

# Summary

Consistent code is easier to understand, maintain, review, and extend.

Every contribution to Atlas Studio must follow these coding standards.
