# @atlas/atlas-editor

Framework-independent editor orchestration runtime for Atlas Studio.

The package coordinates existing Atlas subsystems without reimplementing their responsibilities. Rendering stays in `atlas-renderer`, history stays in `atlas-history`, input stays in `atlas-input`, selection stays in `atlas-selection`, and plugin lifecycle stays in `atlas-plugin`.

## Example

```ts
import { Editor, createSetActiveWorkspaceCommand } from '@atlas/atlas-editor';
import type { ID } from '@atlas/atlas-types';

const editor = new Editor({ id: 'editor:main' as ID<'editor'> });

await editor.initialize();
await editor.start();

editor.dispatch(createSetActiveWorkspaceCommand('workspace:main' as ID<'workspace'>));
```

State changes are routed through `EditorCommand` objects. Applications should not mutate editor state directly.
