/**
 * Base command framework error.
 */
export class CommandFrameworkError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'CommandFrameworkError';
  }
}
