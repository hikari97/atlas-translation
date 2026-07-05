import { DocumentCollection } from '../collection';
import type { LayerDocument } from '../layer';

/**
 * Collection of layers owned by a page.
 */
export class LayerCollection extends DocumentCollection<LayerDocument> {}
