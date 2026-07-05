# Public API

The package exposes a curated root API only:

```ts
import {
  Command,
  CommandHandler,
  DefaultCommandRegistry,
  DefaultHandlerRegistry,
  DefaultCommandResolver,
  DefaultCommandDispatcher,
  DefaultCommandBus,
  PipelineBehavior,
  DefaultValidationBehavior,
  DefaultHistoryStore,
  DefaultUndoStack,
  DefaultRedoStack,
  DefaultCompositeCommand,
  DefaultMacroCommand
} from '@atlas/atlas-command';
```

Internal source paths are not part of the public contract.
