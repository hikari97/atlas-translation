import { Editor, createSetActiveWorkspaceCommand } from '../../src';
import type { ID } from '@atlas/atlas-types';

const editor = new Editor({ id: 'editor:example' as ID<'editor'> });

await editor.initialize();
await editor.start();

editor.dispatch(createSetActiveWorkspaceCommand('workspace:default' as ID<'workspace'>));

editor.snapshot();
