import type { EventContext } from '../context';
import type { EventBus } from '../bus';
import { EventReplayQueue } from './EventReplayQueue';

export class ReplayCoordinator {
  public constructor(private readonly queue: EventReplayQueue) {}

  public async replay(bus: EventBus, context: EventContext): Promise<number> {
    let replayed = 0;
    let entry = this.queue.dequeue();
    while (entry !== undefined) {
      await bus.publish(entry.event, context);
      replayed += 1;
      entry = this.queue.dequeue();
    }
    return replayed;
  }
}
