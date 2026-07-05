import type { Command } from '../command';
import type { HandlerDescriptor, HandlerRegistry } from '../registry';
import type { CommandResolver } from './CommandResolver';
import { CommandResolutionError } from './errors/CommandResolutionError';

/**
 * Registry-backed command resolver.
 */
export class DefaultCommandResolver implements CommandResolver {
  public constructor(private readonly handlers: HandlerRegistry) {}

  public resolve(command: Command): HandlerDescriptor {
    const descriptor = this.handlers.get(command.name);
    if (descriptor === undefined) {
      throw new CommandResolutionError(command.name);
    }
    return descriptor;
  }
}
