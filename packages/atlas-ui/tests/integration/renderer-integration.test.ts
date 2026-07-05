import { UIRendererIntegration } from '@atlas/atlas-ui';
import { createRenderNode, RenderNodeKind, type RenderTree } from '@atlas/atlas-renderer';
import type { ID, Timestamp } from '@atlas/atlas-types';

const tree: RenderTree = {
  root: createRenderNode('render:root:test' as ID<'render-node'>, 'document-1', RenderNodeKind.Root, {}),
  createdAt: new Date().toISOString() as Timestamp
};

const editorView = new UIRendererIntegration().createEditorViewFromTree(tree);
const editorViewKind = editorView.kind;

export { editorViewKind };
