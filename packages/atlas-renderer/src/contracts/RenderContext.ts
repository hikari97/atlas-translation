import type { AtlasDocument } from '@atlas/atlas-document';
import type { RuntimeContext } from '@atlas/atlas-core';
import type { JsonObject } from '@atlas/atlas-types';
import type { RenderOptions } from './RenderOptions';

export interface RenderContext {
  readonly document: AtlasDocument;
  readonly runtime: RuntimeContext | null;
  readonly options: RenderOptions;
  readonly metadata?: JsonObject | undefined;
}
