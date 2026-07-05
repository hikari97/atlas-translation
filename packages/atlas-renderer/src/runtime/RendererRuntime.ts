import type { RuntimeContext } from '@atlas/atlas-core';
import type { AtlasDocument } from '@atlas/atlas-document';
import { DocumentRenderEngine } from '../engine';
import type { RenderOptions, RenderResult } from '../contracts';

export class RendererRuntime {
  private readonly engine = new DocumentRenderEngine();

  public render(document: AtlasDocument, runtime: RuntimeContext | null = null, options: RenderOptions = {
    incremental: false,
    collectDiagnostics: false
  }): RenderResult {
    return this.engine.render({
      document,
      runtime,
      options
    });
  }
}
