import type { ID } from '@atlas/atlas-types';
import { DocumentCollectionIterator } from './CollectionIterator';
import type { IdentifiableDocument } from './CollectionUtils';

/**
 * Encapsulated ordered collection for child documents.
 */
export class DocumentCollection<TDocument extends IdentifiableDocument> implements Iterable<TDocument> {
  private readonly documentsById: Map<ID, TDocument>;

  public constructor(documents: readonly TDocument[] = []) {
    this.documentsById = new Map<ID, TDocument>();
    documents.forEach((document) => this.add(document));
  }

  public get size(): number {
    return this.documentsById.size;
  }

  public isEmpty(): boolean {
    return this.documentsById.size === 0;
  }

  public has(id: ID): boolean {
    return this.documentsById.has(id);
  }

  public get(id: ID): TDocument | undefined {
    return this.documentsById.get(id);
  }

  public add(document: TDocument): void {
    this.documentsById.set(document.id, document);
  }

  public remove(id: ID): boolean {
    return this.documentsById.delete(id);
  }

  public clear(): void {
    this.documentsById.clear();
  }

  public values(): readonly TDocument[] {
    return [...this.documentsById.values()];
  }

  public keys(): readonly ID[] {
    return [...this.documentsById.keys()];
  }

  public toArray(): readonly TDocument[] {
    return this.values();
  }

  public forEach(callback: (document: TDocument) => void): void {
    this.values().forEach(callback);
  }

  public map<TResult>(callback: (document: TDocument) => TResult): readonly TResult[] {
    return this.values().map(callback);
  }

  public filter(callback: (document: TDocument) => boolean): readonly TDocument[] {
    return this.values().filter(callback);
  }

  public find(callback: (document: TDocument) => boolean): TDocument | undefined {
    return this.values().find(callback);
  }

  public [Symbol.iterator](): IterableIterator<TDocument> {
    return new DocumentCollectionIterator(this.values());
  }
}
