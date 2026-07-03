import type { ID, Nullable } from '../common';
import type { LayerType } from '../enums';
import type { LayerLock } from './LayerLock';
import type { LayerMetadata } from './LayerMetadata';
import type { LayerOrder } from './LayerOrder';
import type { LayerStyle } from './LayerStyle';
import type { LayerTransform } from './LayerTransform';
import type { LayerVisibility } from './LayerVisibility';

/**
 * Editable page element used for non-destructive composition.
 */
export interface Layer {
  readonly id: ID<'layer'>;
  readonly pageId: ID<'page'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly type: LayerType;
  readonly metadata: LayerMetadata;
  readonly style: LayerStyle;
  readonly transform: LayerTransform;
  readonly visibility: LayerVisibility;
  readonly lock: LayerLock;
  readonly order: LayerOrder;
  readonly assetIds: readonly ID<'asset'>[];
  readonly bubbleIds: readonly ID<'bubble'>[];
  readonly childLayerIds: readonly ID<'layer'>[];
}
