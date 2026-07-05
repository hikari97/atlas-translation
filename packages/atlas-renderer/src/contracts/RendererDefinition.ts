import type { Renderer } from './Renderer';
import type { RendererDescriptor } from './RendererDescriptor';

export interface RendererDefinition extends Renderer {
  readonly descriptor: RendererDescriptor;
}
