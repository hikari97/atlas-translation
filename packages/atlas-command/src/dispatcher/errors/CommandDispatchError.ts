/**
 * Raised when command dispatch cannot complete.
 */
export class CommandDispatchError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'CommandDispatchError';
  }
}
