export class EmptyCompositeError extends Error {
  public constructor() {
    super('Composite command must contain at least one child command');
    this.name = 'EmptyCompositeError';
  }
}
