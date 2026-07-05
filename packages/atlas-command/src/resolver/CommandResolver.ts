import type { Command } from '../command';
import type { HandlerDescriptor } from '../registry';

/**
 * Resolves handler descriptors for commands.
 */
export interface CommandResolver {
  resolve(command: Command): HandlerDescriptor;
}
