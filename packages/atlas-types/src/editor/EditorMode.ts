import type { EditorMode as EditorModeKind, SelectionMode } from '../enums';

/**
 * Active editor and selection mode pairing.
 */
export interface EditorModeState {
  readonly mode: EditorModeKind;
  readonly selectionMode: SelectionMode;
  readonly readonly: boolean;
}
