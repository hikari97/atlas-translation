/**
 * Raised when a handler mapping cannot be found.
 */
export class HandlerNotFoundError extends Error {
  public constructor(commandName: string) {
    super(`Handler is not registered for command: ${commandName}`);
    this.name = 'HandlerNotFoundError';
  }
}
