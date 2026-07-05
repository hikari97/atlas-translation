import type { ID, Timestamp } from '@atlas/atlas-types';
import type { RenderContext, RenderResult } from '../contracts';

export interface RenderSession {
  readonly id: ID<'render-session'>;
  readonly context: RenderContext;
  readonly startedAt: Timestamp;
  readonly result?: RenderResult | undefined;
}

export function createRenderSession(context: RenderContext, result?: RenderResult): RenderSession {
  return {
    id: `render-session:${Date.now()}` as ID<'render-session'>,
    context,
    startedAt: new Date().toISOString() as Timestamp,
    result
  };
}
