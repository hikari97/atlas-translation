export class HistoryOverflowError extends Error {
  public constructor() {
    super('History store capacity exceeded');
    this.name = 'HistoryOverflowError';
  }
}
