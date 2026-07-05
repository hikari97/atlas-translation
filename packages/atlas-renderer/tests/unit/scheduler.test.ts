import { DocumentRenderEngine, RenderPriority, RenderScheduler } from '@atlas/atlas-renderer';
import type { ID } from '@atlas/atlas-types';
import { createTestDocument } from '../fixtures/createTestDocument';

const scheduler = new RenderScheduler();
scheduler.enqueue({
  id: 'render-task-1' as ID<'render-task'>,
  priority: RenderPriority.High,
  context: {
    document: createTestDocument(),
    runtime: null,
    options: {
      incremental: false,
      collectDiagnostics: false
    }
  }
});

const results = await scheduler.flush(new DocumentRenderEngine());
const scheduledCount: number = results.length;

export { scheduledCount };
