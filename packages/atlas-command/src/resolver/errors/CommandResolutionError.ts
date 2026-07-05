/**
 * Raised when a command cannot be resolved to a handler.
 */
export class CommandResolutionError extends Error {
  public constructor(commandName: string) {
    super(`Unable to resolve handler for command: ${commandName}`);
    this.name = 'CommandResolutionError';
  }
}
