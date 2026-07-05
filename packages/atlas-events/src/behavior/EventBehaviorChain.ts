import type { EventContext } from '../context';
import type { Event } from '../event';
import type { EventPublicationResult } from '../result';
import type { EventBehavior } from './EventBehavior';
import type { EventBehaviorDelegate } from './EventBehaviorDelegate';

export class EventBehaviorChain {
  public execute(
    event: Event,
    context: EventContext,
    behaviors: readonly EventBehavior[],
    finalDelegate: EventBehaviorDelegate
  ): Promise<EventPublicationResult> {
    const behaviorContext = { event, context };
    const delegate = behaviors
      .slice()
      .reverse()
      .reduce<EventBehaviorDelegate>(
        (next, behavior) => () => behavior.handle(behaviorContext, next),
        finalDelegate
      );
    return delegate();
  }
}
