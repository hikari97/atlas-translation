import type { ID, JsonObject, Nullable } from '../common';
import type { FontMetrics } from './FontMetrics';

/**
 * Style, weight, stretch, and metrics for a font variant.
 */
export interface FontVariant {
  readonly id: ID<'font-variant'>;
  readonly familyId: ID<'font-family'>;
  readonly name: string;
  readonly style: 'normal' | 'italic' | 'oblique';
  readonly weight: number;
  readonly stretch: Nullable<string>;
  readonly isVariable: boolean;
  readonly assetId?: ID<'asset'>;
  readonly metrics: FontMetrics;
  readonly custom?: JsonObject;
}
