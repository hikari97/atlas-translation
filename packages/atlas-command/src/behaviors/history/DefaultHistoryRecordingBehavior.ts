import type { ID, Timestamp } from '@atlas/atlas-types';
import type { Command } from '../../command';
import type { HistoryStore } from '../../history';
import type { PipelineBehaviorContext, PipelineDelegate } from '../../pipeline';
import type { RedoStack } from '../../redo';
import { CommandResultStatus, type CommandResult } from '../../result';
import type { UndoStack } from '../../undo';
import type { HistoryRecordingBehavior } from './HistoryRecordingBehavior';

/**
 * Default history recording behavior.
 */
export class DefaultHistoryRecordingBehavior<TCommand extends Command = Command, TResult = unknown>
  implements HistoryRecordingBehavior<TCommand, TResult>
{
  public constructor(
    private readonly history: HistoryStore,
    private readonly undo: UndoStack,
    private readonly redo: RedoStack,
    private readonly now: () => Timestamp,
    private readonly createId: () => ID<'command-history-entry'>
  ) {}

  public async handle(
    context: PipelineBehaviorContext<TCommand>,
    next: PipelineDelegate<TResult>
  ): Promise<CommandResult<TResult>> {
    const startedAt = Date.now();
    const result = await next();

    if (result.status !== CommandResultStatus.Success) {
      return result;
    }

    const id = this.createId();
    const executedAt = this.now();
    this.history.record({
      id,
      commandId: context.command.id,
      commandName: context.command.name,
      status: result.status,
      executedAt,
      durationMs: Date.now() - startedAt,
      correlationId: context.context.correlationId,
      userId: context.context.userId
    });
    this.undo.push({ historyEntryId: id, pushedAt: executedAt });
    this.redo.clear();

    return result;
  }
}
