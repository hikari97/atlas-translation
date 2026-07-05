import type { RenderContext } from './RenderContext';
import type { RendererDescriptor } from './RendererDescriptor';
import type { RenderResult } from './RenderResult';

export interface Renderer {
  readonly descriptor: RendererDescriptor;
  render(context: RenderContext): RenderResult | Promise<RenderResult>;
}
