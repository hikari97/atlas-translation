import type { Command, CommandBus, CommandContext, CommandHandler, CommandResult } from '@atlas/atlas-command';

export interface PluginCommandIntegration {
  execute<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>>;
  register<TCommand extends Command, TResult>(handler: CommandHandler<TCommand, TResult>): void;
}

export class CommandBusPluginIntegration implements PluginCommandIntegration {
  private readonly handlers: CommandHandler[] = [];

  public constructor(private readonly bus: CommandBus) {}

  public async execute<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>> {
    return this.bus.execute<TResult>(command, context);
  }

  public register<TCommand extends Command, TResult>(handler: CommandHandler<TCommand, TResult>): void {
    this.handlers.push(handler as CommandHandler);
  }

  public listHandlers(): readonly CommandHandler[] {
    return this.handlers.slice();
  }
}
