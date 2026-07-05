import type { RenderTree } from '@atlas/atlas-renderer';
import { createEditorView } from '../editor';
import type { UIComponentDescriptor } from '../contracts';

export class UIRendererIntegration {
  public createEditorViewFromTree(tree: RenderTree): UIComponentDescriptor {
    return createEditorView('atlas.ui.editor-view', 'Editor View', String(tree.root.id));
  }
}
