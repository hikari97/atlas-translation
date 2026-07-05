import type { CommandName } from '../command';
import type { CommandDescriptor } from './CommandDescriptor';

/**
 * Registry for command descriptors.
 */
export interface CommandRegistry {
  register(descriptor: CommandDescriptor): void;
  unregister(name: CommandName): boolean;
  has(name: CommandName): boolean;
  get(name: CommandName): CommandDescriptor | undefined;
  list(): readonly CommandDescriptor[];
}
