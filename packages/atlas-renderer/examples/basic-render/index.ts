import { RendererRuntime } from '@atlas/atlas-renderer';
import { createTestDocument } from '../../tests/fixtures/createTestDocument';

const rendererRuntime = new RendererRuntime();
const renderResult = rendererRuntime.render(createTestDocument());

export { renderResult };
