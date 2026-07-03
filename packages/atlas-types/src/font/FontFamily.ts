import type { ID, Nullable } from '../common';

/**
 * Font family metadata and available variants.
 */
export interface FontFamily {
  readonly id: ID<'font-family'>;
  readonly name: string;
  readonly displayName: string;
  readonly foundry: Nullable<string>;
  readonly fallbackNames: readonly string[];
  readonly variantIds: readonly ID<'font-variant'>[];
}
