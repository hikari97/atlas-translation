import { createRuntimeEvent, type RuntimeEvent, type RuntimeEventMetadata, type RuntimeEventSource } from '../src';

const source: RuntimeEventSource = {
  id: 'runtime',
  type: 'runtime',
  name: 'Atlas Runtime',
};

const metadata: RuntimeEventMetadata = {
  correlationId: 'correlation-1',
  causationId: undefined,
  attributes: {
    environment: 'test',
  },
};

const event: RuntimeEvent = createRuntimeEvent(
  'event-1',
  'runtime.started',
  source,
  new Date('2026-07-05T00:00:00.000Z'),
  {
    moduleCount: 1,
    coldStart: true,
  },
  metadata,
);

event.id.toUpperCase();
event.type.toUpperCase();
event.source.id.toUpperCase();
event.occurredAt.toISOString();
event.metadata.correlationId?.toUpperCase();
