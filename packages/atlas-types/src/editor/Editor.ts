import type { ID } from '../common';
import type { ProjectReference } from '../project';
import type { WorkspaceReference } from '../workspace';
import type { EditorPreferences } from './EditorPreferences';
import type { EditorSession } from './EditorSession';
import type { EditorState } from './EditorState';

/**
 * Framework-independent editor state container.
 */
export interface Editor {
  readonly id: ID<'editor'>;
  readonly workspace: WorkspaceReference;
  readonly project: ProjectReference;
  readonly session: EditorSession;
  readonly state: EditorState;
  readonly preferences: EditorPreferences;
}
