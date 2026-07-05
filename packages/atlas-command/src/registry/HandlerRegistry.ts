import type { CommandName } from '../command';
import type { HandlerDescriptor } from './HandlerDescriptor';

/**
 * Registry for command-to-handler mappings.
 */
export interface HandlerRegistry {
  register(descriptor: HandlerDescriptor): void;
  unregister(commandName: CommandName): boolean;
  has(commandName: CommandName): boolean;
  get(commandName: CommandName): HandlerDescriptor | undefined;
  list(): readonly HandlerDescriptor[];
}
