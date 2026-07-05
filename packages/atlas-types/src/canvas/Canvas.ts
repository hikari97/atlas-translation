import type { ID } from '../common';
import type { EditorReference } from '../editor';
import type { PageReference } from '../page';
import type { CanvasState } from './CanvasState';

/**
 * Framework-independent canvas workspace model.
 */
export interface Canvas {
  readonly id: ID<'canvas'>;
  readonly editor: EditorReference;
  readonly page: PageReference;
  readonly coordinateSystem: string;
  readonly state: CanvasState;
}
