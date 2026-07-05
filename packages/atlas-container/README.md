# Atlas Container

Framework-independent dependency injection and service composition for Atlas Studio backend packages.

Atlas Container provides explicit typed tokens, value/class/factory/async providers, deterministic lifetimes, child scopes, modules, diagnostics, and safe adapter patterns for config, runtime, plugins, and tests.

It does not implement HTTP routing, database connections, UI behavior, network loading, provider integrations, decorators, reflection metadata, or hidden global containers.

## Usage

```ts
import { createContainer, createContainerToken } from '@atlas/atlas-container';

interface Logger {
  info(message: string): void;
}

const loggerToken = createContainerToken<Logger>('logger');
const container = createContainer();

container.registerValue(loggerToken, {
  info(message) {
    console.info(message);
  },
}, { lifetime: 'singleton' });

const logger = container.resolve(loggerToken);
```

## Advanced Usage

```ts
import { createContainerModule, factoryProvider } from '@atlas/atlas-container';

const module = createContainerModule('feature', (container) => {
  container.register(serviceToken, factoryProvider((logger) => ({ logger }), [loggerToken]));
});
```

## Testing

```ts
import { createTestContainer, overrideService } from '@atlas/atlas-container';

const container = createTestContainer();
overrideService(container, loggerToken, testLogger);
```

## Validation

```sh
npm run typecheck
npm run test
npm run test:types
npm run build
```
