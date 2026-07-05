import { DocumentRenderEngine, RenderDiffEngine, RenderPatchEngine } from '@atlas/atlas-renderer';
import { createTestDocument } from '../fixtures/createTestDocument';

const engine = new DocumentRenderEngine();
const previous = engine.createTree(createTestDocument());
const next = engine.createTree(createTestDocument());
const diff = new RenderDiffEngine().diff(previous, next);
const patched = new RenderPatchEngine().apply(previous, diff);

const patchAppliedCount: number = patched.applied;

export { patchAppliedCount };
