/**
 * Read-only iterator over document collection values.
 */
export class DocumentCollectionIterator<TDocument> implements IterableIterator<TDocument> {
  private readonly iterator: IterableIterator<TDocument>;

  public constructor(values: readonly TDocument[]) {
    this.iterator = values[Symbol.iterator]();
  }

  public [Symbol.iterator](): IterableIterator<TDocument> {
    return this;
  }

  public next(): IteratorResult<TDocument> {
    return this.iterator.next();
  }
}
