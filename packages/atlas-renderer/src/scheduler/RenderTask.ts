import type { ID } from '@atlas/atlas-types';
import type { RenderContext } from '../contracts';
import type { RenderPriority } from './RenderPriority';

export interface RenderTask {
  readonly id: ID<'render-task'>;
  readonly context: RenderContext;
  readonly priority: RenderPriority;
}
