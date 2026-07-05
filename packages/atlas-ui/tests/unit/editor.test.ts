import { createCaret, createSelection } from '@atlas/atlas-ui';

const caret = createCaret('atlas.ui.test.caret', { x: 12, y: 20 }, true);
const selection = createSelection('atlas.ui.test.selection', [{ minX: 0, minY: 0, maxX: 10, maxY: 10 }]);

const editorComponentNames: readonly string[] = [caret.name, selection.name];

export { editorComponentNames };
