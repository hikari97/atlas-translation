import type { ID, Nullable } from '../common';
import type { BubbleReference } from '../bubble';
import type { LayerReference } from '../layer';
import type { PageReference } from '../page';
import type { TranslationReference } from '../translation';
import type { EditorModeState } from './EditorMode';
import type { EditorTool } from './EditorTool';
import type { EditorViewport } from './EditorViewport';

/**
 * Current state references for an editor instance.
 */
export interface EditorState {
  readonly mode: EditorModeState;
  readonly viewport: EditorViewport;
  readonly activeTool: EditorTool;
  readonly activePage: Nullable<PageReference>;
  readonly activeLayer: Nullable<LayerReference>;
  readonly activeBubble: Nullable<BubbleReference>;
  readonly activeTranslation: Nullable<TranslationReference>;
  readonly selectionId: Nullable<ID<'selection'>>;
}
