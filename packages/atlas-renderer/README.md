# Atlas Renderer

`@atlas/atlas-renderer` converts Atlas Document data into a platform-independent `RenderTree`.

The renderer package owns rendering contracts, render tree generation, traversal, scheduling, diffing, patching, diagnostics, runtime integration, event integration, plugin integration, examples, and benchmark baselines.

It does not provide UI components and does not mutate document state.

## Example

```ts
import { RendererRuntime } from '@atlas/atlas-renderer';

const result = new RendererRuntime().render(document);
```
