export class EventFrameworkError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'EventFrameworkError';
  }
}
