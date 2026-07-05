import type { Command } from '../command';
import type { AsyncCommandHandler } from './AsyncCommandHandler';
import type { CommandHandler } from './CommandHandler';

/**
 * Factory for command handlers.
 */
export interface CommandHandlerFactory<TCommand extends Command = Command, TResult = unknown> {
  create(): CommandHandler<TCommand, TResult> | AsyncCommandHandler<TCommand, TResult>;
}
