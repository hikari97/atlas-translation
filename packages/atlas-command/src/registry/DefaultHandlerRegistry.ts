import type { CommandName } from '../command';
import type { HandlerDescriptor } from './HandlerDescriptor';
import type { HandlerRegistry } from './HandlerRegistry';
import { DuplicateHandlerError } from './errors/DuplicateHandlerError';

/**
 * In-memory handler mapping registry.
 */
export class DefaultHandlerRegistry implements HandlerRegistry {
  private readonly descriptors = new Map<CommandName, HandlerDescriptor>();

  public register(descriptor: HandlerDescriptor): void {
    if (this.descriptors.has(descriptor.commandName)) {
      throw new DuplicateHandlerError(descriptor.commandName);
    }
    this.descriptors.set(descriptor.commandName, descriptor);
  }

  public unregister(commandName: CommandName): boolean {
    return this.descriptors.delete(commandName);
  }

  public has(commandName: CommandName): boolean {
    return this.descriptors.has(commandName);
  }

  public get(commandName: CommandName): HandlerDescriptor | undefined {
    return this.descriptors.get(commandName);
  }

  public list(): readonly HandlerDescriptor[] {
    return [...this.descriptors.values()];
  }
}
