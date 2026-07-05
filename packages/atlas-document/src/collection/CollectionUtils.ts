import type { ID } from '@atlas/atlas-types';

/**
 * Minimal identity contract for documents stored in collections.
 */
export interface IdentifiableDocument {
  readonly id: ID;
}

/**
 * Return a document identifier from a collection-compatible document.
 */
export function getDocumentId(document: IdentifiableDocument): ID {
  return document.id;
}
