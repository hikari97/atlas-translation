export class EmptyRedoStackError extends Error {
  public constructor() {
    super('Redo stack is empty');
    this.name = 'EmptyRedoStackError';
  }
}
