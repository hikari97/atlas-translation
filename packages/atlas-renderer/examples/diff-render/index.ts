import { DocumentRenderEngine, RenderDiffEngine } from '@atlas/atlas-renderer';
import { createTestDocument } from '../../tests/fixtures/createTestDocument';

const engine = new DocumentRenderEngine();
const previousTree = engine.createTree(createTestDocument());
const nextTree = engine.createTree(createTestDocument());
const renderDiff = new RenderDiffEngine().diff(previousTree, nextTree);

export { renderDiff };
