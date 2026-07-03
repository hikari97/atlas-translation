import type { ID } from '../common';
import type { PageDimensions } from './PageDimensions';
import type { PageImage } from './PageImage';
import type { PageMetadata } from './PageMetadata';
import type { PageSettings } from './PageSettings';
import type { PageStatistics } from './PageStatistics';

/**
 * Single comic, manga, or webtoon page within a project.
 */
export interface Page {
  readonly id: ID<'page'>;
  readonly projectId: ID<'project'>;
  readonly index: number;
  readonly name: string;
  readonly dimensions: PageDimensions;
  readonly originalImage: PageImage;
  readonly renderedImage?: PageImage;
  readonly thumbnailImage?: PageImage;
  readonly metadata: PageMetadata;
  readonly settings: PageSettings;
  readonly statistics: PageStatistics;
  readonly layerIds: readonly ID<'layer'>[];
  readonly bubbleIds: readonly ID<'bubble'>[];
  readonly ocrResultIds: readonly ID<'ocr-result'>[];
  readonly translationIds: readonly ID<'translation'>[];
}
