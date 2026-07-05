import type { ID } from '@atlas/atlas-types';
import type { LayerDocument } from '../layer';
import { LayerCollection } from './LayerCollection';
import type { PageImageReference } from './PageImageReference';
import type { PageMetadata } from './PageMetadata';
import type { PageSettings } from './PageSettings';
import type { PageState } from './PageState';

/**
 * Comic page document that owns layers.
 */
export class PageDocument {
  private readonly layerCollection: LayerCollection;

  public constructor(
    public readonly id: ID<'page'>,
    public readonly projectId: ID<'project'>,
    public readonly index: number,
    public readonly name: string,
    public readonly image: PageImageReference,
    public readonly metadata: PageMetadata,
    public readonly settings: PageSettings,
    public readonly state: PageState,
    layers: readonly LayerDocument[] = []
  ) {
    this.layerCollection = new LayerCollection(layers);
  }

  public get layers(): readonly LayerDocument[] {
    return this.layerCollection.values();
  }

  public get layerCount(): number {
    return this.layerCollection.size;
  }

  public getLayer(id: ID<'layer'>): LayerDocument | undefined {
    return this.layerCollection.get(id);
  }

  public hasLayer(id: ID<'layer'>): boolean {
    return this.layerCollection.has(id);
  }

  public addLayer(layer: LayerDocument): void {
    this.layerCollection.add(layer);
  }

  public removeLayer(id: ID<'layer'>): boolean {
    return this.layerCollection.remove(id);
  }

  public clearLayers(): void {
    this.layerCollection.clear();
  }
}
