export class UndoOverflowError extends Error {
  public constructor() {
    super('Undo stack capacity exceeded');
    this.name = 'UndoOverflowError';
  }
}
