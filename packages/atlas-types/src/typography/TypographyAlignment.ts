import type { LanguageDirection } from '../enums';

/**
 * Text alignment and writing direction data.
 */
export interface TypographyAlignment {
  readonly textAlign: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  readonly verticalAlign: 'top' | 'middle' | 'bottom' | 'baseline';
  readonly writingMode: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  readonly languageDirection: LanguageDirection;
}
