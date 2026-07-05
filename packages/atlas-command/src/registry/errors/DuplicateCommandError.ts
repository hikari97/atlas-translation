/**
 * Raised when a command is registered more than once.
 */
export class DuplicateCommandError extends Error {
  public constructor(commandName: string) {
    super(`Command is already registered: ${commandName}`);
    this.name = 'DuplicateCommandError';
  }
}
