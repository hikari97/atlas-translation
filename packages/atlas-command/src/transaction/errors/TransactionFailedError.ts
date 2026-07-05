export class TransactionFailedError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'TransactionFailedError';
  }
}
