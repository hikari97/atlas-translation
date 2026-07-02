# Naming Conventions

> **Status:** Draft
>
> **Version:** 1.0.0
>
> **Last Updated:** 2026-07-01

---

# Purpose

This document defines the official naming conventions for Atlas Studio.

Consistent naming improves:

- Readability
- Discoverability
- Maintainability
- API consistency
- AI-generated code quality

Every package must follow these conventions.

---

# General Principles

Names should be:

- Explicit
- Descriptive
- Predictable
- Consistent

Avoid abbreviations unless universally recognized.

Good

```
TranslationDocument
```

Bad

```
TransDoc
```

---

# Packages

Use:

```
atlas-*
```

Examples

```
atlas-types

atlas-document

atlas-command

atlas-events

atlas-core
```

Plugins should describe functionality.

Examples

```
google-translate

deepl

ocr-tesseract

export-pdf
```

---

# Folders

Use:

```
kebab-case
```

Examples

```
bubble-detector

document-model

translation-memory

command-history
```

Avoid:

```
BubbleDetector

bubble_detector

Bubble_Detector
```

---

# Files

## Classes

```
PascalCase.ts
```

Examples

```
AtlasDocument.ts

BubbleDocument.ts

CommandPipeline.ts
```

---

## Helpers

```
camelCase.ts
```

Examples

```
createDocument.ts

normalizeText.ts

parseColor.ts
```

---

## Tests

```
*.test.ts
```

Examples

```
ProjectDocument.test.ts

BubbleDocument.test.ts
```

---

# Classes

Always use:

```
PascalCase
```

Examples

```
ProjectDocument

DocumentCollection

TranslationProvider
```

---

# Interfaces

Do NOT prefix interfaces with "I".

Good

```
Serializer

DocumentVisitor

Snapshot
```

Bad

```
ISerializer

IDocument

IVisitor
```

---

# Type Aliases

Use:

```
PascalCase
```

Examples

```
TranslationResult

CommandHandler

DocumentId
```

---

# Enums

Use:

```
PascalCase
```

Examples

```
LayerType

BubbleType

DocumentState
```

Members

```
Ready

Running

Completed

Failed
```

---

# Generic Types

Single-letter generics only when obvious.

Good

```ts
DocumentCollection<T>;

Result<T>;

Map<TKey, TValue>;
```

Complex generics should use descriptive names.

```ts
TDocument;

TCommand;

TEvent;

TSnapshot;
```

---

# Variables

Use:

```
camelCase
```

Examples

```
project

currentPage

activeLayer

bubbleCount
```

Avoid

```
obj

tmp

data2

x
```

---

# Boolean Variables

Always positive.

Examples

```
isVisible

isLocked

hasChildren

canUndo

canRedo
```

Avoid

```
notVisible

disable

invalid
```

---

# Methods

Methods should describe actions.

Good

```
addPage()

removeBubble()

createProject()

findTranslation()

serialize()

deserialize()
```

Avoid

```
run()

execute()

go()

process()
```

---

# Event Names

Use:

```
Noun + Past Tense
```

Examples

```
DocumentCreated

PageAdded

BubbleRemoved

TranslationUpdated

ProjectOpened
```

Avoid

```
CreateDocument

UpdateBubble
```

---

# Commands

Use:

```
Verb + Noun
```

Examples

```
CreateProjectCommand

DeleteBubbleCommand

MoveLayerCommand

ImportDocumentCommand
```

---

# Command Handlers

Use:

```
CommandName + Handler
```

Examples

```
CreateProjectHandler

DeleteBubbleHandler

MoveLayerHandler
```

---

# Services

Use:

```
SomethingService
```

Examples

```
TranslationService

RenderService

ImportService

ExportService
```

---

# Factories

Use:

```
SomethingFactory
```

Examples

```
SnapshotFactory

CommandFactory

DocumentFactory
```

---

# Builders

Use:

```
SomethingBuilder
```

Examples

```
DocumentBuilder

ProjectBuilder
```

---

# Managers

Reserved for lifecycle coordination.

Examples

```
PluginManager

WorkspaceManager
```

Do not use Manager unless coordinating multiple objects.

---

# Providers

Provide external resources.

Examples

```
GoogleTranslateProvider

OpenAIProvider

FileSystemProvider
```

---

# Repositories

Persistence only.

Examples

```
ProjectRepository

DocumentRepository
```

---

# Adapters

Wrap third-party APIs.

Examples

```
OpenAIAdapter

TesseractAdapter
```

---

# Exceptions

Use:

```
SomethingError
```

Examples

```
ValidationError

DocumentNotFoundError

SerializationError
```

---

# Constants

Global

```
UPPER_SNAKE_CASE
```

Examples

```
DEFAULT_TIMEOUT

MAX_PAGE_SIZE

DEFAULT_LANGUAGE
```

---

# Environment Variables

Always

```
UPPER_SNAKE_CASE
```

Examples

```
OPENAI_API_KEY

ATLAS_DEBUG

NODE_ENV
```

---

# Branch Names

Use

```
feature/

bugfix/

refactor/

docs/

test/

release/
```

Examples

```
feature/document-model

feature/undo-redo

bugfix/page-loading

docs/architecture

release/v1.0.0
```

---

# Commit Messages

Follow Conventional Commits.

Examples

```
feat(document): add PageDocument

fix(command): resolve undo issue

refactor(core): simplify renderer

docs(architecture): add ADR-0001

test(document): add traversal tests
```

---

# Pull Requests

Title format

```
feat(document): implement snapshot framework
```

---

# Documentation Files

Always uppercase.

Examples

```
README.md

CHANGELOG.md

API.md

ARCHITECTURE.md

CONTRIBUTING.md

ROADMAP.md
```

---

# Markdown Files

Use

```
UPPER_SNAKE_CASE.md
```

Examples

```
PACKAGE_DEPENDENCY_GRAPH.md

PACKAGE_LIFECYCLE.md

DESIGN_PRINCIPLES.md

CODING_STANDARDS.md
```

---

# Examples

Good

```
CreateProjectCommand

ProjectDocument

TranslationService

OpenAIProvider

DocumentCollection

SnapshotFactory
```

Bad

```
CreateProj

ProjDoc

TransSvc

Manager2

Data

Util
```

---

# Reserved Suffixes

Use suffixes consistently.

| Suffix     | Purpose               |
| ---------- | --------------------- |
| Document   | Document model        |
| Command    | Command object        |
| Handler    | Command handler       |
| Event      | Domain event          |
| Service    | Business service      |
| Provider   | External provider     |
| Factory    | Object creation       |
| Builder    | Fluent construction   |
| Repository | Persistence           |
| Adapter    | Third-party wrapper   |
| Collection | Child collections     |
| Context    | Runtime context       |
| Options    | Configuration         |
| Result     | Operation result      |
| Error      | Exception             |
| Strategy   | Replaceable algorithm |
| Visitor    | Tree traversal        |
| Pipeline   | Sequential processing |

---

# Summary

Every identifier in Atlas Studio should communicate its responsibility clearly.

Consistent naming reduces ambiguity, improves discoverability, and enables both developers and AI tools to navigate the codebase efficiently.
