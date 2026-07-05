import { RendererRuntime, RenderResultStatus } from '@atlas/atlas-renderer';
import { createTestDocument } from '../fixtures/createTestDocument';

const result = new RendererRuntime().render(createTestDocument());
const runtimeStatus: RenderResultStatus = result.status;

export { runtimeStatus };
