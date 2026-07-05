import {
  DefaultEventBus,
  DefaultEventJournal,
  EventJournalBehavior,
  EventReplayQueue,
  ReplayCoordinator
} from '@atlas/atlas-events';
import { contextFixture, eventFixture } from '../unit/events.test';

const journal = new DefaultEventJournal();
const bus = new DefaultEventBus([new EventJournalBehavior(journal)]);
const queue = new EventReplayQueue();
queue.enqueue({ event: eventFixture, sequence: 0 });

export const lifecycle = {
  publish: bus.publish(eventFixture, contextFixture),
  replay: new ReplayCoordinator(queue).replay(bus, contextFixture)
};
