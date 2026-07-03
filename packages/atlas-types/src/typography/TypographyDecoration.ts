import type { Nullable } from '../common';

/**
 * Text decoration data.
 */
export interface TypographyDecoration {
  readonly underline: boolean;
  readonly overline: boolean;
  readonly lineThrough: boolean;
  readonly color: Nullable<string>;
  readonly style: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
}
