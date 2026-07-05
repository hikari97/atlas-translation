export class RedoError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'RedoError';
  }
}
