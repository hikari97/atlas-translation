# Atlas Plugin

`@atlas/atlas-plugin` provides the official extension mechanism for Atlas Studio.

It defines strongly typed plugin contracts, registry, dependency ordering, lifecycle execution, discovery, diagnostics, configuration, security policy, and integration boundaries for command, event, and runtime systems.

## Example

```ts
import { DefaultPluginManager, PluginBuilder } from '@atlas/atlas-plugin';

const plugin = PluginBuilder.create('atlas.example')
  .name('Example Plugin')
  .version('1.0.0')
  .build();

const manager = new DefaultPluginManager();
manager.register(plugin);
```

## Package Boundary

This package depends only on public APIs from `atlas-types`, `atlas-document`, `atlas-command`, `atlas-events`, and `atlas-core`.
