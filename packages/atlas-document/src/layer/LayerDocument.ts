import type { ID } from '@atlas/atlas-types';
import type { BubbleDocument } from '../bubble';
import { BubbleCollection } from './BubbleCollection';
import type { LayerMetadata } from './LayerMetadata';
import type { LayerSettings } from './LayerSettings';
import type { LayerState } from './LayerState';

/**
 * Editable layer document that owns bubbles.
 */
export class LayerDocument {
  private readonly bubbleCollection: BubbleCollection;

  public constructor(
    public readonly id: ID<'layer'>,
    public readonly pageId: ID<'page'>,
    public readonly name: string,
    public readonly metadata: LayerMetadata,
    public readonly settings: LayerSettings,
    public readonly state: LayerState,
    bubbles: readonly BubbleDocument[] = []
  ) {
    this.bubbleCollection = new BubbleCollection(bubbles);
  }

  public get bubbles(): readonly BubbleDocument[] {
    return this.bubbleCollection.values();
  }

  public get bubbleCount(): number {
    return this.bubbleCollection.size;
  }

  public getBubble(id: ID<'bubble'>): BubbleDocument | undefined {
    return this.bubbleCollection.get(id);
  }

  public hasBubble(id: ID<'bubble'>): boolean {
    return this.bubbleCollection.has(id);
  }

  public addBubble(bubble: BubbleDocument): void {
    this.bubbleCollection.add(bubble);
  }

  public removeBubble(id: ID<'bubble'>): boolean {
    return this.bubbleCollection.remove(id);
  }

  public clearBubbles(): void {
    this.bubbleCollection.clear();
  }
}
