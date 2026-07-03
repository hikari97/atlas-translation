import type { ID, JsonObject, Nullable } from '../common';

/**
 * Typography and visual styling data for bubble text and shape presentation.
 */
export interface BubbleStyle {
  readonly fontId?: ID<'font'>;
  readonly fontFamily: Nullable<string>;
  readonly fontSize: number;
  readonly fontWeight: Nullable<string>;
  readonly fontStyle: Nullable<string>;
  readonly textColor: Nullable<string>;
  readonly fillColor: Nullable<string>;
  readonly strokeColor: Nullable<string>;
  readonly strokeWidth: number;
  readonly opacity: number;
  readonly lineHeight: number;
  readonly letterSpacing: number;
  readonly textAlign: 'left' | 'center' | 'right' | 'justify';
  readonly verticalAlign: 'top' | 'middle' | 'bottom';
  readonly custom?: JsonObject;
}
