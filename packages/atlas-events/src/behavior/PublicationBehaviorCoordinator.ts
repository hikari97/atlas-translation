import type { EventContext } from '../context';
import type { Event } from '../event';
import type { EventPublicationResult } from '../result';
import type { EventBehavior } from './EventBehavior';
import type { EventBehaviorDelegate } from './EventBehaviorDelegate';
import { EventBehaviorChain } from './EventBehaviorChain';

export class PublicationBehaviorCoordinator {
  private readonly chain = new EventBehaviorChain();

  public constructor(private readonly behaviors: readonly EventBehavior[] = []) {}

  public execute(
    event: Event,
    context: EventContext,
    finalDelegate: EventBehaviorDelegate
  ): Promise<EventPublicationResult> {
    return this.chain.execute(event, context, this.behaviors, finalDelegate);
  }
}
