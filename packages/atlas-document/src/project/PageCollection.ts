import { DocumentCollection } from '../collection';
import type { PageDocument } from '../page';

/**
 * Collection of pages owned by a project.
 */
export class PageCollection extends DocumentCollection<PageDocument> {}
