import type { ID } from '@atlas/atlas-types';
import type { BubbleContent } from './BubbleContent';
import type { BubbleGeometry } from './BubbleGeometry';
import type { BubbleMetadata } from './BubbleMetadata';
import type { BubbleOCRReference } from './BubbleOCRReference';
import type { BubbleState } from './BubbleState';
import type { BubbleTranslationReference } from './BubbleTranslationReference';
import type { BubbleTypographyReference } from './BubbleTypographyReference';

/**
 * Editable text region document.
 */
export class BubbleDocument {
  private currentContent: BubbleContent;
  private currentGeometry: BubbleGeometry;
  private currentState: BubbleState;

  public constructor(
    public readonly id: ID<'bubble'>,
    public readonly layerId: ID<'layer'>,
    geometry: BubbleGeometry,
    content: BubbleContent,
    public readonly typography: BubbleTypographyReference,
    public readonly ocr: BubbleOCRReference,
    public readonly translation: BubbleTranslationReference,
    state: BubbleState,
    public readonly metadata: BubbleMetadata
  ) {
    this.currentGeometry = geometry;
    this.currentContent = content;
    this.currentState = state;
  }

  public get geometry(): BubbleGeometry {
    return this.currentGeometry;
  }

  public get content(): BubbleContent {
    return this.currentContent;
  }

  public get state(): BubbleState {
    return this.currentState;
  }

  public hasTranslation(): boolean {
    return this.translation.translationId !== null;
  }

  public hasOCR(): boolean {
    return this.ocr.ocrId !== null;
  }

  public setContent(content: BubbleContent): void {
    this.currentContent = content;
  }

  public setGeometry(geometry: BubbleGeometry): void {
    this.currentGeometry = geometry;
  }

  public setState(state: BubbleState): void {
    this.currentState = state;
  }
}
