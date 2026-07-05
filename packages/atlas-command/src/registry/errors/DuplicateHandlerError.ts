/**
 * Raised when a handler mapping is registered more than once.
 */
export class DuplicateHandlerError extends Error {
  public constructor(commandName: string) {
    super(`Handler is already registered for command: ${commandName}`);
    this.name = 'DuplicateHandlerError';
  }
}
