import type { ID, JsonObject, Nullable } from '../common';
import type { TypographyAlignment } from './TypographyAlignment';
import type { TypographyDecoration } from './TypographyDecoration';
import type { TypographyShadow } from './TypographyShadow';
import type { TypographySpacing } from './TypographySpacing';
import type { TypographyStroke } from './TypographyStroke';
import type { TypographyStyle } from './TypographyStyle';
import type { TypographyTransform } from './TypographyTransform';

/**
 * Reusable text appearance and layout data.
 */
export interface Typography {
  readonly id: ID<'typography'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly style: TypographyStyle;
  readonly alignment: TypographyAlignment;
  readonly spacing: TypographySpacing;
  readonly stroke: TypographyStroke;
  readonly shadow: TypographyShadow;
  readonly decoration: TypographyDecoration;
  readonly transform: TypographyTransform;
  readonly custom?: JsonObject;
}
