# @atlas/atlas-command

Command execution framework for Atlas Studio document mutations.

All writes to the Atlas Document Object Model should flow through commands, handlers, pipeline behaviors, transactions, and history recording.

## Install

```bash
npm install @atlas/atlas-command
```

## Quick Start

```ts
import {
  CommandResultStatus,
  DefaultCommandBus,
  DefaultCommandDispatcher,
  DefaultCommandResolver,
  DefaultHandlerRegistry
} from '@atlas/atlas-command';
```

## Boundaries

This package depends only on `@atlas/atlas-types` and `@atlas/atlas-document`. It does not publish events, render UI, run OCR, call AI providers, or contain business workflows.
