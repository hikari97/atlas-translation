import type { EventBehavior, EventBehaviorContext, EventBehaviorDelegate } from '../behavior';
import type { EventPublicationResult } from '../result';
import type { EventJournal } from './EventJournal';

export class EventJournalBehavior implements EventBehavior {
  public constructor(private readonly journal: EventJournal) {}

  public async handle(
    context: EventBehaviorContext,
    next: EventBehaviorDelegate
  ): Promise<EventPublicationResult> {
    const result = await next();
    this.journal.append({
      event: context.event,
      sequence: this.journal.list().length
    });
    return result;
  }
}
