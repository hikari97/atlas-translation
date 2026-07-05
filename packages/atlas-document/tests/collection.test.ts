import { DocumentCollection } from '@atlas/atlas-document/collection';
import type { ID } from '@atlas/atlas-types';

interface TestDocument {
  readonly id: ID<'test-document'>;
  readonly name: string;
}

const first: TestDocument = {
  id: 'first' as ID<'test-document'>,
  name: 'First'
};

const collection = new DocumentCollection<TestDocument>();
collection.add(first);

export const collectionResult = {
  size: collection.size,
  exists: collection.has(first.id),
  item: collection.get(first.id),
  values: collection.values(),
  mapped: collection.map((document) => document.name),
  removed: collection.remove(first.id)
};
