import type { ID, Nullable } from '../common';
import type { BubbleType } from '../enums';
import type { BubbleConfidence } from './BubbleConfidence';
import type { BubbleContent } from './BubbleContent';
import type { BubbleGeometry } from './BubbleGeometry';
import type { BubbleMetadata } from './BubbleMetadata';
import type { BubbleOCR } from './BubbleOCR';
import type { BubbleStyle } from './BubbleStyle';
import type { BubbleTranslation } from './BubbleTranslation';

/**
 * Editable text region on a comic, manga, or webtoon page.
 */
export interface Bubble {
  readonly id: ID<'bubble'>;
  readonly pageId: ID<'page'>;
  readonly layerId: Nullable<ID<'layer'>>;
  readonly type: BubbleType;
  readonly geometry: BubbleGeometry;
  readonly style: BubbleStyle;
  readonly content: BubbleContent;
  readonly ocr: BubbleOCR;
  readonly translation: BubbleTranslation;
  readonly confidence: BubbleConfidence;
  readonly metadata: BubbleMetadata;
  readonly relatedBubbleIds: readonly ID<'bubble'>[];
}
