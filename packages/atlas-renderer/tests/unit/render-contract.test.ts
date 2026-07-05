import { RendererBackend, RendererBuilder, RenderResultStatus } from '@atlas/atlas-renderer';
import { createTestDocument } from '../fixtures/createTestDocument';

const renderer = RendererBuilder.create('atlas.test.renderer')
  .name('Test Renderer')
  .version('1.0.0')
  .backend(RendererBackend.Memory)
  .renderer(() => ({
    status: RenderResultStatus.Skipped,
    tree: null,
    errors: []
  }))
  .build();

const descriptorName: string = renderer.descriptor.name;
const document = createTestDocument();
const projectCount: number = document.projectCount;

export { descriptorName, projectCount };
