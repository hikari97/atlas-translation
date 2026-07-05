import { Editor, createSetActiveWorkspaceCommand } from '../src';
import type { ID } from '@atlas/atlas-types';

const editor = new Editor({ id: 'editor:benchmark' as ID<'editor'> });
const iterations = 1_000;
const start = Date.now();

for (let index = 0; index < iterations; index += 1) {
  editor.dispatch(createSetActiveWorkspaceCommand(`workspace:${index}` as ID<'workspace'>));
}

export const runtimeBenchmarkResult = {
  iterations,
  durationMs: Date.now() - start,
  revision: editor.current().revision
};
