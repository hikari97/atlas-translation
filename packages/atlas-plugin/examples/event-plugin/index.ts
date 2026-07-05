import type { Timestamp } from '@atlas/atlas-types';
import type { EventId, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import { PluginBuilder, type PluginContext } from '@atlas/atlas-plugin';

const eventPlugin = PluginBuilder.create('atlas.example.event')
  .name('Event Plugin')
  .version('1.0.0')
  .lifecycle({
    activate: async (context: PluginContext) => {
      await context.publish({
        id: 'example-event' as EventId,
        type: 'atlas.example.event' as EventType,
        payload: {},
        metadata: {
          priority: EventPriority.Normal,
          occurredAt: new Date().toISOString() as Timestamp,
          correlationId: null
        }
      });
    }
  })
  .build();

export { eventPlugin };
