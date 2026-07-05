/**
 * Raised when a command descriptor cannot be found.
 */
export class CommandNotFoundError extends Error {
  public constructor(commandName: string) {
    super(`Command is not registered: ${commandName}`);
    this.name = 'CommandNotFoundError';
  }
}
