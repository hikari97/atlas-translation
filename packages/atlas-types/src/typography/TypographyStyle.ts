import type { ID, JsonObject, Nullable } from '../common';

/**
 * Core text appearance data.
 */
export interface TypographyStyle {
  readonly fontId?: ID<'font'>;
  readonly fontFamily: Nullable<string>;
  readonly fontSize: number;
  readonly fontWeight: Nullable<string>;
  readonly fontStyle: Nullable<string>;
  readonly textColor: Nullable<string>;
  readonly backgroundColor: Nullable<string>;
  readonly opacity: number;
  readonly custom?: JsonObject;
}
