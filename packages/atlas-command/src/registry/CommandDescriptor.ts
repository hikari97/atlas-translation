import type { CommandName } from '../command';

/**
 * Metadata describing a registered command type.
 */
export interface CommandDescriptor {
  readonly name: CommandName;
  readonly description: string;
  readonly version: string;
}
