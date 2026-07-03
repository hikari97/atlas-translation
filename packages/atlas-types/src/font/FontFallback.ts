import type { ID } from '../common';

/**
 * Fallback chain used when a glyph is unavailable in the primary font.
 */
export interface FontFallback {
  readonly primaryFontId: ID<'font'>;
  readonly fallbackFontIds: readonly ID<'font'>[];
  readonly genericFamily:
    | 'serif'
    | 'sans-serif'
    | 'monospace'
    | 'cursive'
    | 'fantasy'
    | 'system-ui';
}
