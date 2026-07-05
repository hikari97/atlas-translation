export class TransactionCommitError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'TransactionCommitError';
  }
}
