import type { CommandName } from '../command';
import type { CommandDescriptor } from './CommandDescriptor';
import type { CommandRegistry } from './CommandRegistry';
import { DuplicateCommandError } from './errors/DuplicateCommandError';

/**
 * In-memory command descriptor registry.
 */
export class DefaultCommandRegistry implements CommandRegistry {
  private readonly descriptors = new Map<CommandName, CommandDescriptor>();

  public register(descriptor: CommandDescriptor): void {
    if (this.descriptors.has(descriptor.name)) {
      throw new DuplicateCommandError(descriptor.name);
    }
    this.descriptors.set(descriptor.name, descriptor);
  }

  public unregister(name: CommandName): boolean {
    return this.descriptors.delete(name);
  }

  public has(name: CommandName): boolean {
    return this.descriptors.has(name);
  }

  public get(name: CommandName): CommandDescriptor | undefined {
    return this.descriptors.get(name);
  }

  public list(): readonly CommandDescriptor[] {
    return [...this.descriptors.values()];
  }
}
