# Examples

## Command Handler

```ts
import { CommandResultStatus } from '@atlas/atlas-command';

const result = {
  status: CommandResultStatus.Success,
  value: null,
  errors: []
};
```

## Registry

```ts
import { DefaultHandlerRegistry } from '@atlas/atlas-command';

const registry = new DefaultHandlerRegistry();
```

## Composite Command

```ts
import { CompositeExecutionMode } from '@atlas/atlas-command';

const mode = CompositeExecutionMode.Sequential;
```
