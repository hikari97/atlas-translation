export class TransactionRollbackError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'TransactionRollbackError';
  }
}
