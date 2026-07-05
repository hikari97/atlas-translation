/**
 * Raised when validation infrastructure fails.
 */
export class ValidationException extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}
