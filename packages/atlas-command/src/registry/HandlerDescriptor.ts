import type { CommandName } from '../command';
import type { CommandHandlerFactory } from '../handler';

/**
 * Metadata describing a handler mapping.
 */
export interface HandlerDescriptor {
  readonly commandName: CommandName;
  readonly handlerName: string;
  readonly factory: CommandHandlerFactory;
}
