export class RedoOverflowError extends Error {
  public constructor() {
    super('Redo stack capacity exceeded');
    this.name = 'RedoOverflowError';
  }
}
