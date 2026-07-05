import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { CommandDispatcher } from '../dispatcher';
import type { CommandResult } from '../result';
import type { AsyncCommandBus } from './AsyncCommandBus';

/**
 * Dispatcher-backed asynchronous command bus.
 */
export class DefaultCommandBus implements AsyncCommandBus {
  public constructor(private readonly dispatcher: CommandDispatcher) {}

  public execute<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>> {
    return this.dispatcher.dispatch<TResult>(command, context);
  }
}
