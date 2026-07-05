import type { RenderContext, RenderResult } from '../contracts';

export interface RenderEngine {
  render(context: RenderContext): RenderResult | Promise<RenderResult>;
}
