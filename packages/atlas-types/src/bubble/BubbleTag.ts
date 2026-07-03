import type { ID, Nullable } from '../common';

/**
 * Label assigned to a bubble for organization and workflow filtering.
 */
export interface BubbleTag {
  readonly id: ID<'bubble-tag'>;
  readonly name: string;
  readonly color: Nullable<string>;
}
