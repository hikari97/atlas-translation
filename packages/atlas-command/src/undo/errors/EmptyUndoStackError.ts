export class EmptyUndoStackError extends Error {
  public constructor() {
    super('Undo stack is empty');
    this.name = 'EmptyUndoStackError';
  }
}
