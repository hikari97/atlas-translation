import type { RendererBackend } from './RendererBackend';

export interface RenderOptions {
  readonly incremental: boolean;
  readonly collectDiagnostics: boolean;
  readonly targetBackend?: RendererBackend | undefined;
}
